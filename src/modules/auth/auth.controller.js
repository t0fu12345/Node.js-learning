const authService = require('./auth.service');
const authView = require('./auth.view');

// Hiển thị form đăng nhập
const getLoginPage = (req, res) => {
    const error = req.query.error;
    res.send(authView.renderLogin(error));
};

// Hiển thị form đăng ký
const getRegisterPage = (req, res) => {
    const error = req.query.error;
    res.send(authView.renderRegister(error));
};

// Xử lý POST Login
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await authService.loginUser(username, password);
        // Lưu token vào cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day
        res.redirect('/foods'); // Đăng nhập xong về trang chủ (menu)
    } catch (error) {
        res.redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }
};

// Xử lý POST Register
const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        await authService.registerUser(username, password);
        res.redirect('/login?error=' + encodeURIComponent('Đăng ký thành công, vui lòng đăng nhập!'));
    } catch (error) {
        res.redirect(`/register?error=${encodeURIComponent(error.message)}`);
    }
};

// Xử lý Đăng xuất
const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

module.exports = { getLoginPage, getRegisterPage, login, register, logout };
