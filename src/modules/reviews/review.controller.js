const reviewService = require('./review.service');
const reviewView = require('./review.view');

const addReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const foodId = req.params.foodId;
        await reviewService.createReview(req.user.id, foodId, rating, comment);
        res.redirect(`/foods/${foodId}`);
    } catch (error) {
        // Có thể redirect kèm error query
        res.send(`<script>alert("${error.message}"); window.location.href="/foods/${req.params.foodId}";</script>`);
    }
};

const getAdminReviews = async (req, res, next) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.send(reviewView.renderAdminReviews(reviews, req.user));
    } catch (error) {
        next(error);
    }
};

module.exports = { addReview, getAdminReviews };
