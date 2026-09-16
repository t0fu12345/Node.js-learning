const orderService = require('./order.service');
const orderView = require('./order.view');

// Đặt hàng (POST)
const createOrder = async (req, res, next) => {
    try {
        await orderService.createOrder(req.user.id);
        res.redirect('/orders');
    } catch (error) {
        // Lỗi thường do transaction failed (hết hàng, v.v)
        res.redirect(`/cart?error=${encodeURIComponent(error.message)}`);
    }
};

// Xem lịch sử đơn hàng của mình
const getUserOrders = async (req, res, next) => {
    try {
        const error = req.query.error;
        const orders = await orderService.getUserOrders(req.user.id);
        res.send(orderView.renderOrders(orders, req.user, error));
    } catch (error) {
        next(error);
    }
};

// Khách tự hủy đơn
const cancelOrder = async (req, res, next) => {
    try {
        await orderService.cancelOrder(req.params.id, req.user.id);
        res.redirect('/orders');
    } catch (error) {
        res.redirect(`/orders?error=${encodeURIComponent(error.message)}`);
    }
};

// ------------- STAFF / ADMIN -------------
// Xem tất cả đơn hàng
const getManageOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders();
        res.send(orderView.renderManageOrders(orders, req.user));
    } catch (error) {
        next(error);
    }
};

// Đổi trạng thái đơn hàng
const updateOrderStatus = async (req, res, next) => {
    try {
        await orderService.updateOrderStatus(req.params.id, req.body.status);
        res.redirect('/manage/orders');
    } catch (error) {
        next(error);
    }
};

module.exports = { createOrder, getUserOrders, cancelOrder, getManageOrders, updateOrderStatus };
