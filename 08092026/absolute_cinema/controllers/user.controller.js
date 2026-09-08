const UserModel = require('../models/user.model');
const viewList = require('../views/users/user.view-list');
const viewAdd = require('../views/users/user.view-add');
const viewEdit = require('../views/users/user.view-edit');
const viewDelete = require('../views/users/user.view-delete');

const listUsers = async (req, res) => {
    try {
        const data = await UserModel.getAll();
        res.send(viewList(data));
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi lấy danh sách người dùng");
    }
};

const showAddForm = (req, res) => {
    res.send(viewAdd());
};

const processAdd = async (req, res) => {
    try {
        const { name, birthday, phone, address, password } = req.body;
        await UserModel.create({ name, birthday, phone, address, password });
        res.redirect('/users/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi thêm người dùng");
    }
};

const showEditForm = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.getById(id);
        if (user) {
            res.send(viewEdit(user));
        } else {
            res.status(404).send('Không tìm thấy người dùng');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi hiển thị form sửa");
    }
};

const processEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, birthday, phone, address, password } = req.body;
        await UserModel.update(id, { name, birthday, phone, address, password });
        res.redirect('/users/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi sửa người dùng");
    }
};

const showDeleteForm = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.getById(id);
        if (user) {
            res.send(viewDelete(user));
        } else {
            res.status(404).send('Không tìm thấy người dùng');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi hiển thị form xóa");
    }
};

const processDelete = async (req, res) => {
    try {
        const id = req.params.id;
        await UserModel.delete(id);
        res.redirect('/users/index');
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi xóa người dùng");
    }
};

module.exports = {
    listUsers,
    showAddForm,
    processAdd,
    showEditForm,
    processEdit,
    showDeleteForm,
    processDelete
};
