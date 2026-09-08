module.exports = () => {
    return `
        <!DOCTYPE html>
        <html>
        <head><title>Thêm người dùng</title></head>
        <body>
            <h1>Thêm người dùng mới</h1>
            <form action="/users/add" method="POST">
                <label>Tên: <input type="text" name="name" required></label><br><br>
                <label>Ngày sinh: <input type="date" name="birthday"></label><br><br>
                <label>SĐT: <input type="text" name="phone"></label><br><br>
                <label>Địa chỉ: <input type="text" name="address"></label><br><br>
                <label>Mật khẩu: <input type="password" name="password" required></label><br><br>
                <button type="submit">Lưu</button>
            </form>
            <br>
            <a href="/users/index">Quay lại danh sách</a>
        </body>
        </html>
    `;
};
