const { renderLayout } = require('../utils/layout.view');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const html = renderLayout('500 Lỗi Hệ Thống', `
        <div class="card" style="text-align: center;">
            <h1 style="color: red;">500 - Đã xảy ra lỗi hệ thống!</h1>
            <p>${err.message}</p>
            <a href="/foods" class="btn">Quay lại Trang chủ</a>
        </div>
    `, req.user);
    res.status(500).send(html);
};

module.exports = errorHandler;
