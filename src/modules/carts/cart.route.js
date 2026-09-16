const express = require('express');
const router = express.Router();
const cartController = require('./cart.controller');
const { requireLogin } = require('../../core/middlewares/auth.middleware');

router.get('/cart', requireLogin, cartController.getCartPage);
router.post('/cart/items', requireLogin, cartController.addItemToCart);
router.delete('/cart/items/:foodId', requireLogin, cartController.removeItemFromCart);

module.exports = router;
