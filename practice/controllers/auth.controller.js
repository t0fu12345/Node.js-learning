const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Tên người dùng hoặc email đã tồn tại' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await newUser.save();
        res.status(201).json({
            message: 'Đăng ký thành công',
            user: { _id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({
            message: 'Đăng nhập thành công',
            user: { _id: user._id, username: user.username, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Đăng xuất thành công' });
};

module.exports = {
    register,
    login,
    logout
};
