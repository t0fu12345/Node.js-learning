const ProductModel = require('../models/product.model');

const getAllProducts = (req, res) => {
    const data = ProductModel.getAll();
    res.json({
        message: "Lấy danh sách thành công",
        data: data
    })
}

const getProductbyId = (req, res) => {
    const id = req.params.id;
    const data = ProductModel.getById(id);
    if (data) {
        res.json({
            message: "Lấy thành công",
            data: data
        })
    } else {
        res.status(404).json({
            message: "Ko tìm thấy sản phẩm"
        })
    }
}

const createProduct = (req, res) => {
    const { prod_name, cat_id, price, img, content } = req.body;
    const newProduct = ProductModel.create({ prod_name, cat_id, price, img, content });

    res.status(201).json({
        message: "Thêm sản phẩm thành công",
        data: newProduct
    })
}

const updateProduct = (req, res) => {
    const id = req.params.id;
    const { prod_name, cat_id, price, img, content } = req.body;
    const updatedProduct = ProductModel.update(id, { prod_name, cat_id, price, img, content });

    if (updatedProduct) {
        res.json({
            message: "Cập nhật thành công",
            data: updatedProduct
        })
    } else {
        res.status(404).json({
            message: "Ko tìm thấy sản phẩm"
        })
    }
}

const deleteProduct = (req, res) => {
    const id = req.params.id;
    const deletedProduct = ProductModel.delete(id);

    if (deletedProduct) {
        res.json({
            message: "Xóa thành công"
        })
    } else {
        res.status(404).json({ message: "Ko tìm thấy sản phẩm để xóa" })
    }
}

module.exports = {
    getAllProducts,
    getProductbyId,
    createProduct,
    updateProduct,
    deleteProduct
}