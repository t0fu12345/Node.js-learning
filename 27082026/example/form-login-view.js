const formLoginView = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200);

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Đăng Nhập</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 400px;
                margin: 60px auto;
                padding: 25px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #f9f9f9;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            h1 {
                text-align: center;
                color: #333;
                margin-bottom: 20px;
            }
            .form-group {
                margin-bottom: 15px;
            }
            label {
                display: block;
                margin-bottom: 6px;
                font-weight: bold;
                color: #555;
            }
            input[type="email"],
            input[type="password"],
            input[type="text"] {
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 15px;
                outline: none;
            }
            input:focus {
                border-color: #007bff;
            }
            button {
                width: 100%;
                padding: 12px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                margin-top: 10px;
                transition: background-color 0.2s;
            }
            button:hover {
                background-color: #0056b3;
            }
            .register-link {
                text-align: center;
                margin-top: 15px;
                font-size: 14px;
                color: #666;
            }
            .register-link a {
                color: #007bff;
                text-decoration: none;
                font-weight: bold;
            }
            .register-link a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <h1>Đăng Nhập</h1>
        <form action="/user/login" method="POST">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Nhập email..." required>
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu:</label>
                <input type="password" id="password" name="password" placeholder="Nhập mật khẩu..." required>
            </div>
            <button type="submit">Đăng Nhập</button>
            <div class="register-link">
                Chưa có tài khoản? <a href="/user/register">Đăng ký ngay</a>
            </div>
        </form>
    </body>
    </html>
    `;

    res.end(htmlContent);
};

module.exports = formLoginView;