const express = require('express');
const router = express.Router();
const reviewController = require('./review.controller');
const { requireLogin, authorize } = require('../../core/middlewares/auth.middleware');

router.post('/foods/:foodId/reviews', requireLogin, reviewController.addReview);
router.get('/admin/reviews', requireLogin, authorize('ADMIN'), reviewController.getAdminReviews);

module.exports = router;
