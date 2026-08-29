const userProfile = (req, res, user) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200);
    
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thông Tin Tài Khoản</title>
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
            .info-text {
                padding: 10px;
                background-color: #f8f9fa;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 15px;
                color: #333;
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
            .btn-logout {
                background-color: #dc3545;
            }
            .btn-logout:hover {
                background-color: #c82333;
            }
        </style>
    </head>
    <body>
        <div class="form-card">
            <h1>Thông Tin Tài Khoản</h1>
            <div class="form-group">
                <label>Họ và tên:</label>
                <div class="info-text">${user.fullname || 'Chưa cập nhật'}</div>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <div class="info-text">${user.email || 'Chưa cập nhật'}</div>
            </div>
            <div class="form-group">
                <label>Ngày sinh:</label>
                <div class="info-text">${user.dob || 'Chưa cập nhật'}</div>
            </div>
            <div class="form-group">
                <label>Địa chỉ:</label>
                <div class="info-text">${user.address || 'Chưa cập nhật'}</div>
            </div>
            <a href="/user/logout" class="btn-back btn-logout" style="margin-top: 20px;">Đăng Xuất</a>
        </div>
    </body>
    </html>
    `;
    res.end(htmlContent);
}
module.exports = userProfile;
