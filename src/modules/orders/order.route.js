const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const { requireLogin, authorize } = require('../../core/middlewares/auth.middleware');

// Customer routes
router.post('/orders', requireLogin, orderController.createOrder);
router.get('/orders', requireLogin, orderController.getUserOrders);
router.patch('/orders/:id/cancel', requireLogin, orderController.cancelOrder);

// Staff/Admin routes
router.get('/manage/orders', requireLogin, authorize('STAFF', 'ADMIN'), orderController.getManageOrders);
router.patch('/manage/orders/:id/status', requireLogin, authorize('STAFF', 'ADMIN'), orderController.updateOrderStatus);

module.exports = router;
