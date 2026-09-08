module.exports = () => {
    return `
        <!DOCTYPE html>
        <html>
        <head><title>Thêm Ghi chú</title></head>
        <body>
            <h1>Thêm Ghi chú mới</h1>
            <form action="/add" method="POST">
                <label>Tiêu đề: <input type="text" name="title" required></label><br><br>
                <label>Hình thu nhỏ (URL): <input type="text" name="thumbnail"></label><br><br>
                <label>Nội dung: <textarea name="content"></textarea></label><br><br>
                <label>Trạng thái: 
                    <select name="status">
                        <option value="public">Công khai</option>
                        <option value="private">Riêng tư</option>
                    </select>
                </label><br><br>
                <input type="hidden" name="created_at" value="${new Date().toISOString()}">
                <input type="hidden" name="updated_at" value="${new Date().toISOString()}">
                <button type="submit">Lưu Ghi chú</button>
            </form>
            <br>
            <a href="/index">Quay lại danh sách</a>
        </body>
        </html>
    `;
};
