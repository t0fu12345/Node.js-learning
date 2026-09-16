const Category = require('./category.model');

const getAllCategories = async () => {
    return await Category.find();
};

const createCategory = async (name, description) => {
    const category = new Category({ name, description });
    await category.save();
    return category;
};

module.exports = { getAllCategories, createCategory };
