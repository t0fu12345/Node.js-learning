module.exports = (note) => {
    return `
        <!DOCTYPE html>
        <html>
        <head><title>Xóa Ghi chú</title></head>
        <body>
            <h1>Xóa Ghi chú</h1>
            <p>Bạn có chắc chắn muốn xóa ghi chú <strong>${note.title}</strong> không?</p>
            <form action="/delete/${note._id}" method="POST">
                <button type="submit">Đồng ý Xóa</button>
            </form>
            <br>
            <a href="/index">Hủy / Quay lại</a>
        </body>
        </html>
    `;
};
