require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const { requireAuth } = require('./middlewares/auth.middleware');

app.get('/', requireAuth, (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="vi">
        <head><meta charset="UTF-8"><title>Trang chủ</title></head>
        <body style="font-family: sans-serif; padding: 20px; text-align: center;">
            <h2>Chào mừng bạn, ${res.locals.currentUser.username}!</h2>
            <p>Đây là trang chủ dành cho thành viên đã đăng nhập.</p>
            <a href="/logout" style="padding: 10px 15px; background: #dc3545; color: white; text-decoration: none;">Đăng xuất</a>
        </body>
        </html>
    `);
});

const authRoutes = require('./routes/auth.route');
app.use('/', authRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route không tồn tại" });
})

app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});

