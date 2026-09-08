const CustomerModel = require('../models/customer.model');

const getAllCustomers = (req, res) => {
    const data = CustomerModel.getAll();

    res.json({ message: "Lấy danh sách thành công", data });
};

const getCustomerById = (req, res) => {
    const id = req.params.id;
    const data = CustomerModel.getById(id);

    if (data) {
        res.json({
            message: "Lấy thành công",
            data: data
        });
    } else {
        res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }
};

const searchCustomers = (req, res) => {
    const { keyword } = req.query;
    const data = CustomerModel.search(keyword);

    res.json({
        message: "Tìm kiếm thành công",
        data: data
    });
};

const createCustomer = (req, res) => {
    const { fullname, email, phone, address } = req.body;
    const newCustomer = CustomerModel.create({ fullname, email, phone, address });

    res.status(201).json({
        message: "Thêm khách hàng thành công",
        data: newCustomer
    });
};

const updateCustomer = (req, res) => {
    const id = req.params.id;
    const { fullname, email, phone, address } = req.body;
    const updatedCustomer = CustomerModel.update(id, { fullname, email, phone, address });

    if (updatedCustomer) {
        res.json({
            message: "Cập nhật thành công",
            data: updatedCustomer
        });
    } else {
        res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }
};

const deleteCustomer = (req, res) => {
    const id = req.params.id;
    const deleted = CustomerModel.delete(id);

    if (deleted) {
        res.json({ message: "Xóa thành công" });
    } else {
        res.status(404).json({ message: "Không tìm thấy khách hàng để xóa" });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    searchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
