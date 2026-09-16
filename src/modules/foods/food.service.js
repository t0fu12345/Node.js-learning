const Food = require('./food.model');

const getFoods = async (filter = {}) => {
    // filter can be categoryId, search text, etc.
    const query = {};
    if (filter.categoryId) query.categoryId = filter.categoryId;
    if (filter.search) query.name = { $regex: filter.search, $options: 'i' };

    return await Food.find(query).populate('categoryId');
};

const getFoodById = async (id) => {
    return await Food.findById(id).populate('categoryId');
};

const createFood = async (data) => {
    const food = new Food(data);
    await food.save();
    return food;
};

const updateFood = async (id, data) => {
    return await Food.findByIdAndUpdate(id, data, { new: true });
};

const deleteFood = async (id) => {
    return await Food.findByIdAndDelete(id);
};

module.exports = { getFoods, getFoodById, createFood, updateFood, deleteFood };
