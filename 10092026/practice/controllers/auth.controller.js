const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const viewRegister = require('../views/auth.register-view');
const viewLogin = require('../views/auth.login-view');
const viewLogout = require('../views/auth.logout-view');

const showRegisterForm = (req, res) => {
    res.send(viewRegister());
};

const processRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await UserModel.getByUsernameOrEmail(username || email);

        if (existingUser) {
            return res.status(400).send("Tên đăng nhập hoặc email đã tồn tại. <a href='/register'>Quay lại</a>");
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        res.redirect('/login');
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        res.status(500).send("Lỗi server");
    }
};

const showLoginForm = (req, res) => {
    res.send(viewLogin());
};

const processLogin = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const user = await UserModel.getByUsernameOrEmail(identifier);

        if (!user) {
            return res.status(400).send("Tài khoản không tồn tại. <a href='/login'>Quay lại</a>");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send("Sai mật khẩu. <a href='/login'>Quay lại</a>");
        }

        const payload = { id: user._id, username: user.username };
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });
        
        res.cookie('user_auth', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

        res.redirect('/');
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        res.status(500).send("Lỗi server");
    }
};

const showLogoutForm = (req, res) => {
    res.send(viewLogout());
};

const processLogout = (req, res) => {
    res.clearCookie('user_auth');
    res.redirect('/login');
};

module.exports = {
    showRegisterForm,
    processRegister,
    showLoginForm,
    processLogin,
    showLogoutForm,
    processLogout
};
