const Cart = require('./cart.model');

const getCartByUserId = async (userId) => {
    let cart = await Cart.findOne({ userId }).populate('items.foodId');
    if (!cart) {
        cart = await Cart.create({ userId, items: [] });
    }
    return cart;
};

const addToCart = async (userId, foodId, quantity) => {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await Cart.create({ userId, items: [] });
    }
    
    const existingItemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId.toString());
    if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += parseInt(quantity, 10);
    } else {
        cart.items.push({ foodId, quantity: parseInt(quantity, 10) });
    }
    
    await cart.save();
    return cart;
};

const removeFromCart = async (userId, foodId) => {
    let cart = await Cart.findOne({ userId });
    if (cart) {
        cart.items = cart.items.filter(item => item.foodId.toString() !== foodId.toString());
        await cart.save();
    }
    return cart;
};

module.exports = { getCartByUserId, addToCart, removeFromCart };
