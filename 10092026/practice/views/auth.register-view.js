module.exports = () => {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>Đăng ký</title>
        <style>
            body { font-family: sans-serif; padding: 20px; max-width: 400px; margin: auto; }
            input { display: block; width: 100%; margin-bottom: 15px; padding: 10px; box-sizing: border-box; }
            button { padding: 10px 15px; background: #007bff; color: white; border: none; cursor: pointer; }
        </style>
    </head>
    <body>
        <h2>Đăng ký tài khoản</h2>
        <form action="/register" method="POST">
            <input type="text" name="username" placeholder="Tên đăng nhập" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Mật khẩu" required>
            <button type="submit">Đăng ký</button>
        </form>
        <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
    </body>
    </html>
    `;
};
