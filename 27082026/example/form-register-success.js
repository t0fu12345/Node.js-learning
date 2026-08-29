const formRegisterSuccess = (req, res, data = {}) => {
    const { fullname = '', email = '', password = '', dob = '', address = '' } = data;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200);

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Đăng Ký Thành Công</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f2f5;
                margin: 0;
                padding: 40px 20px;
                display: flex;
                justify-content: center;
            }
            .success-card {
                background: #ffffff;
                max-width: 500px;
                width: 100%;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .success-icon {
                text-align: center;
                font-size: 48px;
                color: #28a745;
                margin-bottom: 10px;
            }
            h1 {
                text-align: center;
                color: #28a745;
                margin-bottom: 25px;
                font-size: 24px;
            }
            .info-item {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid #eee;
            }
            .info-item:last-child {
                border-bottom: none;
            }
            .label {
                font-weight: bold;
                color: #555;
            }
            .value {
                color: #333;
                text-align: right;
            }
            .btn-back {
                display: block;
                text-align: center;
                margin-top: 25px;
                padding: 12px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                transition: background-color 0.2s;
            }
            .btn-back:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="success-card">
            <div class="success-icon">✓</div>
            <h1>Đăng Ký Thành Công!</h1>
            <div class="info-item">
                <span class="label">Họ và tên:</span>
                <span class="value">${fullname}</span>
            </div>
            <div class="info-item">
                <span class="label">Email:</span>
                <span class="value">${email}</span>
            </div>
            <div class="info-item">
                <span class="label">Mật khẩu:</span>
                <span class="value">${password}</span>
            </div>
            <div class="info-item">
                <span class="label">Ngày sinh:</span>
                <span class="value">${dob}</span>
            </div>
            <div class="info-item">
                <span class="label">Địa chỉ:</span>
                <span class="value">${address}</span>
            </div>
            <a href="/user/register" class="btn-back">Quay lại trang Đăng ký</a>
        </div>
    </body>
    </html>
    `;

    res.end(htmlContent);
};

module.exports = formRegisterSuccess;