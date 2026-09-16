const jwt = require('jsonwebtoken');
const { renderLayout } = require('../utils/layout.view');

const requireLogin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, username, role }
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/login?error=InvalidToken');
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            const html = renderLayout('403 Forbidden', `
                <div class="card" style="text-align: center; color: red;">
                    <h1>403 - Không có quyền truy cập!</h1>
                    <p>Bạn không có đủ quyền (${roles.join(', ')}) để thực hiện hành động này.</p>
                    <a href="/foods" class="btn">Quay lại Trang chủ</a>
                </div>
            `, req.user);
            return res.status(403).send(html);
        }
        next();
    };
};

module.exports = { requireLogin, authorize };
