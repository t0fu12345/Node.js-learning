module.exports = () => {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>Đăng nhập</title>
        <style>
            body { font-family: sans-serif; padding: 20px; max-width: 400px; margin: auto; }
            input { display: block; width: 100%; margin-bottom: 15px; padding: 10px; box-sizing: border-box; }
            button { padding: 10px 15px; background: #007bff; color: white; border: none; cursor: pointer; }
        </style>
    </head>
    <body>
        <h2>Đăng nhập</h2>
        <form action="/login" method="POST">
            <input type="text" name="identifier" placeholder="Tên đăng nhập hoặc Email" required>
            <input type="password" name="password" placeholder="Mật khẩu" required>
            <button type="submit">Đăng nhập</button>
        </form>
        <p>Chưa có tài khoản? <a href="/register">Đăng ký ngay</a></p>
    </body>
    </html>
    `;
};
