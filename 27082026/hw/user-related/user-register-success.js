const userRegisterSuccess = (req, res, formData) => {
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
                text-align: center;
                padding: 50px;
                background-color: #f0f2f5;
            }
            .success-box {
                background: #fff;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                max-width: 500px;
                margin: 0 auto;
            }
            .success-icon {
                font-size: 80px;
                margin-bottom: 20px;
            }
            h1 {
                color: #28a745;
                margin-bottom: 10px;
            }
            p {
                font-size: 16px;
                color: #666;
                margin-bottom: 25px;
            }
            .info-box {
                background-color: #e9f7ef;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                text-align: left;
            }
            .info-item {
                margin-bottom: 10px;
            }
            .label {
                font-weight: bold;
                color: #555;
            }
            .btn {
                background-color: #007bff;
                color: white;
                padding: 12px 25px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                transition: background-color 0.2s;
            }
            .btn:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="success-box">
            <div class="success-icon">🎉</div>
            <h1>Đăng Ký Thành Công!</h1>
            <p>Tài khoản của bạn đã được tạo thành công.</p>
            
            <div class="info-box">
                <div class="info-item"><span class="label">Họ và tên:</span> ${formData.fullname}</div>
                <div class="info-item"><span class="label">Email:</span> ${formData.email}</div>
                <div class="info-item"><span class="label">Ngày sinh:</span> ${formData.dob}</div>
                <div class="info-item"><span class="label">Địa chỉ:</span> ${formData.address}</div>
            </div>
            
            <a href="/user/login" class="btn">Quay lại Đăng Nhập</a>
        </div>
    </body>
    </html>
    `;
    res.end(htmlContent);
}
module.exports = userRegisterSuccess;
