module.exports = (user) => {
    return `
        <!DOCTYPE html>
        <html>
        <head><title>Sửa người dùng</title></head>
        <body>
            <h1>Sửa người dùng</h1>
            <form action="/users/edit/${user._id}" method="POST">
                <label>Tên: <input type="text" name="name" value="${user.name}" required></label><br><br>
                <label>Ngày sinh: <input type="date" name="birthday" value="${user.birthday}"></label><br><br>
                <label>SĐT: <input type="text" name="phone" value="${user.phone}"></label><br><br>
                <label>Địa chỉ: <input type="text" name="address" value="${user.address}"></label><br><br>
                <label>Mật khẩu: <input type="password" name="password" value="${user.password}" required></label><br><br>
                <button type="submit">Cập nhật</button>
            </form>
            <br>
            <a href="/users/index">Quay lại danh sách</a>
        </body>
        </html>
    `;
};
