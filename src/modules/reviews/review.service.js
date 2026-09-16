const Review = require('./review.model');
const Order = require('../orders/order.model');

const createReview = async (userId, foodId, rating, comment) => {
    // 1. Kiểm tra đã mua hàng & Đã hoàn thành
    const hasBought = await Order.findOne({
        userId,
        status: 'COMPLETED',
        'items.foodId': foodId
    });

    if (!hasBought) {
        throw new Error('Bạn phải mua và hoàn thành đơn hàng mới được đánh giá.');
    }

    // 2. Kiểm tra chống spam (1 người 1 đánh giá cho 1 món)
    const existingReview = await Review.findOne({ userId, foodId });
    if (existingReview) {
        throw new Error('Bạn đã đánh giá món ăn này rồi.');
    }

    const review = new Review({ userId, foodId, rating, comment });
    await review.save();
    return review;
};

const getReviewsByFoodId = async (foodId) => {
    return await Review.find({ foodId }).populate('userId', 'username').sort({ createdAt: -1 });
};

const getAllReviews = async () => {
    return await Review.find()
        .populate('userId', 'username')
        .populate('foodId', 'name')
        .sort({ createdAt: -1 });
};

module.exports = { createReview, getReviewsByFoodId, getAllReviews };
