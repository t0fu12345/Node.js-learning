const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Vui lòng đăng nhập để thực hiện chức năng này' });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("Thiếu signature");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'Người dùng không tồn tại' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Bạn không có quyền thực hiện chức năng này' });
    }
};

module.exports = { verifyToken, isAdmin };
