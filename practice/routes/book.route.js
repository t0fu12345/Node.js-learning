const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/book.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Public routes (Ai cũng xem được sách)
router.get('/', getBooks);
router.get('/:id', getBookById);

// Protected routes (Chỉ Admin mới được thêm/sửa/xóa)
router.post('/', verifyToken, isAdmin, createBook);
router.put('/:id', verifyToken, isAdmin, updateBook);
router.delete('/:id', verifyToken, isAdmin, deleteBook);

module.exports = router;
