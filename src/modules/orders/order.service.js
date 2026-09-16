const mongoose = require('mongoose');
const Order = require('./order.model');
const Cart = require('../carts/cart.model');
const Food = require('../foods/food.model');

const createOrder = async (userId) => {
    try {
        const cart = await Cart.findOne({ userId }).populate('items.foodId');
        if (!cart || cart.items.length === 0) {
            throw new Error('Giỏ hàng trống!');
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of cart.items) {
            const food = item.foodId;
            if (!food) continue; // Food bị xóa

            if (!food.is_available || food.stock_quantity < item.quantity) {
                throw new Error(`Món ${food.name} không đủ số lượng trong kho.`);
            }

            totalAmount += food.price * item.quantity;
            
            // Add to order items snapshot
            orderItems.push({
                foodId: food._id,
                snapshot_name: food.name,
                snapshot_price: food.price,
                quantity: item.quantity
            });
        }

        if (orderItems.length === 0) {
            throw new Error('Không có món ăn hợp lệ trong giỏ.');
        }

        const newOrder = new Order({
            userId,
            items: orderItems,
            total_amount: totalAmount,
            status: 'PENDING'
        });

        await newOrder.save();

        // Xóa giỏ hàng
        cart.items = [];
        await cart.save();

        return newOrder;
    } catch (error) {
        throw error;
    }
};

const getUserOrders = async (userId) => {
    return await Order.find({ userId }).sort({ createdAt: -1 });
};

const getAllOrders = async () => {
    return await Order.find().populate('userId', 'username').sort({ createdAt: -1 });
};

const updateOrderStatus = async (orderId, status) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Không tìm thấy đơn hàng');

    // Chuyển sang CONFIRMED từ PENDING -> Trừ kho
    if (status === 'CONFIRMED' && order.status === 'PENDING') {
        // Kiểm tra số lượng trước khi trừ
        for (const item of order.items) {
            const food = await Food.findById(item.foodId);
            if (!food || !food.is_available || food.stock_quantity < item.quantity) {
                throw new Error(`Món ${item.snapshot_name} không đủ số lượng để duyệt.`);
            }
        }
        // Trừ kho
        for (const item of order.items) {
            await Food.findByIdAndUpdate(item.foodId, { $inc: { stock_quantity: -item.quantity } });
        }
    }

    // Hủy đơn khi đã duyệt -> Hoàn trả kho
    if (status === 'CANCELLED' && ['CONFIRMED', 'PREPARING', 'READY'].includes(order.status)) {
        for (const item of order.items) {
            await Food.findByIdAndUpdate(item.foodId, { $inc: { stock_quantity: item.quantity } });
        }
    }

    order.status = status;
    await order.save();
    return order;
};

const cancelOrder = async (orderId, userId) => {
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) throw new Error('Không tìm thấy đơn hàng');
    if (order.status !== 'PENDING') throw new Error('Chỉ được hủy đơn hàng đang chờ xác nhận (PENDING)');
    
    order.status = 'CANCELLED';

    await order.save();
    return order;
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus, cancelOrder };
