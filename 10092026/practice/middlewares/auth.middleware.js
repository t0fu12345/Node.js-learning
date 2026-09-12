const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    // Đọc cookie 'user_auth' từ request (yêu cầu app.js phải có app.use(cookieParser()))
    const cookieData = req.cookies.user_auth;

    if (!cookieData) {
        // Nếu không có cookie -> Đẩy ra trang login
        return res.redirect('/login');
    }

    try {
        // Xác thực và giải mã JWT
        const secretKey = process.env.JWT_SECRET;
        const user = jwt.verify(cookieData, secretKey);
        res.locals.currentUser = user;
        
        // Cho phép đi tiếp vào module users
        next();
    } catch (error) {
        console.error('Lỗi parse cookie:', error);
        res.clearCookie('user_auth');
        return res.redirect('/login');
    }
};

module.exports = { requireAuth };
