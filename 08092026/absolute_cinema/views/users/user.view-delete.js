module.exports = (user) => {
    return `
        <!DOCTYPE html>
        <html>
        <head><title>Xóa người dùng</title></head>
        <body>
            <h1>Xóa người dùng</h1>
            <p>Bạn có chắc chắn muốn xóa người dùng <strong>${user.name}</strong> không?</p>
            <form action="/users/delete/${user._id}" method="POST">
                <button type="submit">Đồng ý Xóa</button>
            </form>
            <br>
            <a href="/users/index">Hủy / Quay lại</a>
        </body>
        </html>
    `;
};
