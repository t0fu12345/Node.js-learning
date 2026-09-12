module.exports = () => {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>Đăng xuất</title>
        <style>
            body { font-family: sans-serif; padding: 20px; max-width: 400px; margin: auto; text-align: center; }
            button { padding: 10px 15px; background: #dc3545; color: white; border: none; cursor: pointer; margin-top: 20px;}
            a { display: inline-block; padding: 10px 15px; background: #6c757d; color: white; text-decoration: none; margin-top: 20px; }
        </style>
    </head>
    <body>
        <h2>Đăng xuất</h2>
        <p>Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?</p>
        <form action="/logout" method="POST">
            <button type="submit">Đăng xuất</button>
            <a href="/users">Hủy</a>
        </form>
    </body>
    </html>
    `;
};
