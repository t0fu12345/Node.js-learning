const cartService = require('./cart.service');
const cartView = require('./cart.view');

const getCartPage = async (req, res, next) => {
    try {
        const error = req.query.error;
        const cart = await cartService.getCartByUserId(req.user.id);
        res.send(cartView.renderCart(cart, req.user, error));
    } catch (error) {
        next(error);
    }
};

const addItemToCart = async (req, res, next) => {
    try {
        const { foodId, quantity } = req.body;
        await cartService.addToCart(req.user.id, foodId, quantity);
        res.redirect('/cart');
    } catch (error) {
        res.redirect(`/cart?error=${encodeURIComponent(error.message)}`);
    }
};

const removeItemFromCart = async (req, res, next) => {
    try {
        const { foodId } = req.params;
        await cartService.removeFromCart(req.user.id, foodId);
        res.redirect('/cart');
    } catch (error) {
        res.redirect(`/cart?error=${encodeURIComponent(error.message)}`);
    }
};

module.exports = { getCartPage, addItemToCart, removeItemFromCart };
