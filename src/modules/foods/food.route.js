const express = require('express');
const router = express.Router();
const foodController = require('./food.controller');
const { requireLogin, authorize } = require('../../core/middlewares/auth.middleware');

// Public or Logged-in Customer routes
// Ở đây ta có thể requireLogin hoặc không tùy chiến lược, 
// nhưng theo template ta gắn req.user, nên cứ dùng một middleware nhẹ (tuỳ chọn) hoặc requireLogin
router.get('/foods', requireLogin, foodController.getFoods);
router.get('/foods/:id', requireLogin, foodController.getFoodDetail);

// Admin routes
router.get('/admin/foods', requireLogin, authorize('ADMIN'), foodController.getAdminFoods);
router.post('/admin/foods', requireLogin, authorize('ADMIN'), foodController.createFood);
router.delete('/admin/foods/:id', requireLogin, authorize('ADMIN'), foodController.deleteFood);

module.exports = router;
