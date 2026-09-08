module.exports = (users) => {
    let rows = users.map(u => `
        <tr>
            <td>${u._id}</td>
            <td>${u.name}</td>
            <td>${u.birthday || ''}</td>
            <td>${u.phone || ''}</td>
            <td>${u.address || ''}</td>
            <td>
                <a href="/users/edit/${u._id}">Sửa</a> |
                <a href="/users/delete/${u._id}">Xóa</a>
            </td>
        </tr>
    `).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head><title>Danh sách người dùng</title></head>
        <body>
            <h1>Danh sách người dùng</h1>
            <a href="/users/add">Thêm người dùng mới</a>
            <br><br>
            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Ngày sinh</th>
                    <th>SĐT</th>
                    <th>Địa chỉ</th>
                    <th>Hành động</th>
                </tr>
                ${rows}
            </table>
        </body>
        </html>
    `;
};
