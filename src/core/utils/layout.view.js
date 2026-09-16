/**
 * 
 * @param {string} title Tiêu đề trang
 * @param {string} bodyContent Nội dung HTML bên trong body
 * @param {object} user Thông tin user đang đăng nhập (để hiển thị Navbar)
 * @returns {string} Toàn bộ trang HTML
 */
const renderLayout = (title, bodyContent, user = null) => {
    const navbar = user ? `
        <nav style="background: #333; color: white; padding: 10px; display: flex; justify-content: space-between;">
            <div>
                <a href="/foods" style="color: white; margin-right: 15px; text-decoration: none;">Menu</a>
                <a href="/cart" style="color: white; margin-right: 15px; text-decoration: none;">Giỏ hàng</a>
                <a href="/orders" style="color: white; margin-right: 15px; text-decoration: none;">Đơn hàng</a>
                ${user.role === 'ADMIN' ? '<a href="/admin/foods" style="color: yellow; margin-right: 15px; text-decoration: none;">Quản lý Thực đơn</a>' : ''}
                ${user.role === 'ADMIN' ? '<a href="/admin/reviews" style="color: yellow; margin-right: 15px; text-decoration: none;">Quản lý Đánh giá</a>' : ''}
                ${['ADMIN', 'STAFF'].includes(user.role) ? '<a href="/manage/orders" style="color: yellow; margin-right: 15px; text-decoration: none;">Quản lý Đơn hàng</a>' : ''}
                ${['ADMIN', 'STAFF'].includes(user.role) ? '<a href="/manage/tables" style="color: yellow; margin-right: 15px; text-decoration: none;">Quản lý Bàn</a>' : ''}
            </div>
            <div>
                <span>Xin chào, <b>${user.username}</b> (${user.role})</span>
                <form action="/logout" method="POST" style="display:inline; margin-left: 10px;">
                    <button type="submit">Đăng xuất</button>
                </form>
            </div>
        </nav>
    ` : `
        <nav style="background: #333; color: white; padding: 10px; text-align: right;">
            <a href="/login" style="color: white; margin-right: 15px; text-decoration: none;">Đăng nhập</a>
            <a href="/register" style="color: white; text-decoration: none;">Đăng ký</a>
        </nav>
    `;

    return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Restaurant System</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f9f9f9; }
        .container { max-width: 1200px; margin: 20px auto; padding: 0 15px; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .btn { padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-danger { background: #dc3545; }
        .btn-success { background: #28a745; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        table, th, td { border: 1px solid #ddd; }
        th, td { padding: 10px; text-align: left; }
        th { background: #f2f2f2; }
    </style>
</head>
<body>
    ${navbar}
    <div class="container">
        ${bodyContent}
    </div>
</body>
</html>
    `;
};

module.exports = { renderLayout };
