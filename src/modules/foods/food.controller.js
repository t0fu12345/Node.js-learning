const foodService = require('./food.service');
const categoryService = require('../categories/category.service');
const foodView = require('./food.view');
const reviewService = require('../reviews/review.service');

const getFoods = async (req, res, next) => {
    try {
        const filter = {
            search: req.query.search,
            categoryId: req.query.category
        };
        const foods = await foodService.getFoods(filter);
        const categories = await categoryService.getAllCategories();
        res.send(foodView.renderFoods(foods, categories, req.user));
    } catch (error) {
        next(error);
    }
};

const getFoodDetail = async (req, res, next) => {
    try {
        const food = await foodService.getFoodById(req.params.id);
        if (!food) throw new Error('Không tìm thấy món ăn');
        
        const reviews = await reviewService.getReviewsByFoodId(food._id);
        
        res.send(foodView.renderFoodDetail(food, reviews, req.user));
    } catch (error) {
        next(error);
    }
};

// ADMIN Controllers
const getAdminFoods = async (req, res, next) => {
    try {
        const foods = await foodService.getFoods();
        let categories = await categoryService.getAllCategories();
        
        // Tự động tạo một Category mặc định nếu db trống (để dễ test)
        if (categories.length === 0) {
            await categoryService.createCategory('Khai vị', 'Món ăn mở đầu');
            categories = await categoryService.getAllCategories();
        }

        res.send(foodView.renderAdminFoods(foods, categories, req.user));
    } catch (error) {
        next(error);
    }
};

const createFood = async (req, res, next) => {
    try {
        await foodService.createFood(req.body);
        res.redirect('/admin/foods');
    } catch (error) {
        next(error);
    }
};

const deleteFood = async (req, res, next) => {
    try {
        await foodService.deleteFood(req.params.id);
        res.redirect('/admin/foods');
    } catch (error) {
        next(error);
    }
};

module.exports = { getFoods, getFoodDetail, getAdminFoods, createFood, deleteFood };
