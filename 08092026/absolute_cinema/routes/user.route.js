const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// 1. Hiển thị list người dùng
router.get('/index', userController.listUsers);

// 2. Thêm người dùng
router.get('/add', userController.showAddForm);
router.post('/add', userController.processAdd);

// 3. Sửa người dùng
router.get('/edit/:id', userController.showEditForm);
router.post('/edit/:id', userController.processEdit);

// 4. Xóa người dùng
router.get('/delete/:id', userController.showDeleteForm);
router.post('/delete/:id', userController.processDelete);

module.exports = router;
