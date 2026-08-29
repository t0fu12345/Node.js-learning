const userLogin = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200);
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Đăng Nhập Tài Khoản</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f2f5;
                margin: 0;
                padding: 40px 20px;
                display: flex;
                justify-content: center;
            }
            .form-card {
                background: #ffffff;
                max-width: 500px;
                width: 100%;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            h1 {
                text-align: center;
                color: #007bff;
                margin-bottom: 25px;
                font-size: 24px;
            }
            .form-group {
                margin-bottom: 15px;
            }
            label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                color: #555;
            }
            input[type="text"],
            input[type="email"],
            input[type="password"] {
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 15px;
                box-sizing: border-box;
            }
            input:focus {
                outline: none;
                border-color: #007bff;
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
            }
            button {
                width: 100%;
                padding: 12px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                margin-top: 10px;
                transition: background-color 0.2s;
            }
            button:hover {
                background-color: #0056b3;
            }
            .btn-back {
                display: block;
                text-align: center;
                margin-top: 15px;
                padding: 10px;
                background-color: #6c757d;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 14px;
                transition: background-color 0.2s;
            }
            .btn-back:hover {
                background-color: #5a6268;
            }
        </style>
    </head>
    <body>
        <div class="form-card">
            <h1>Đăng Nhập Tài Khoản</h1>
            <form action="/user/login" method="POST">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Nhập email" required>
                </div>
                <div class="form-group">
                    <label for="password">Mật khẩu:</label>
                    <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required>
                </div>
                <button type="submit">Đăng Nhập</button>
                <a href="/user/register" class="btn-back">Quay lại trang Đăng Ký</a>
            </form>
        </div>
    </body>
    </html>
    `;
    res.end(htmlContent);
}
module.exports = userLogin;