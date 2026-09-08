module.exports = (notes) => {
    let rows = notes.map(n => `
        <tr>
            <td>${n.title}</td>
            <td><img src="${n.thumbnail || ''}" width="50" alt="thumb"></td>
            <td>${n.status || ''}</td>
            <td>
                <a href="/edit/${n._id}">Sửa</a> |
                <a href="/delete/${n._id}">Xóa</a>
            </td>
        </tr>
    `).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head><title>Danh sách Ghi chú</title></head>
        <body>
            <h1>Danh sách Ghi chú</h1>
            <a href="/add">Thêm Ghi chú mới</a>
            <br><br>
            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>Tiêu đề</th>
                    <th>Hình ảnh</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                ${rows}
            </table>
        </body>
        </html>
    `;
};
