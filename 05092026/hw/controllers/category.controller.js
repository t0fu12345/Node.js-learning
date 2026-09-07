const CategoryModel = require('../models/category.model');

const getAllCategories = (req, res) => {
    const data = CategoryModel.getAll();
    res.json({
        message: "Lấy danh sách thành công",
        data: data
    })
}

const getCategoryById = (req, res) => {
    const id = req.params.id; //id tu url
    const data = CategoryModel.getById(id);
    if (data) {
        res.json({
            message: "Lấy thành công",
            data: data
        })
    } else {
        res.status(404).json({
            message: "Ko tìm thấy danh mục"
        })
    }
}

const createCategory = (req, res) => {
    const { cat_name } = req.body;
    const newCategory = CategoryModel.create({ cat_name });

    res.status(201).json({
        message: "Thêm danh mục thành công",
        data: newCategory
    })
}

const updateCategory = (req, res) => {
    const id = req.params.id;
    const { cat_name } = req.body;
    const updatedCategory = CategoryModel.update(id, { cat_name });

    if (updatedCategory) {
        res.json({
            message: "Cập nhật thành công",
            data: updatedCategory
        })
    } else {
        res.status(404).json({
            message: "Ko tìm thấy danh mục"
        })
    }
}

const deleteCategory = (req, res) => {
    const id = req.params.id;
    const deletedCategory = CategoryModel.delete(id);

    if (deletedCategory) {
        res.json({
            message: "Xóa thành công"
        })
    } else {
        res.status(404).json({ message: "Ko tìm thấy danh mục để xóa" })
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};