module.exports = (note) => {
    return `
        <!DOCTYPE html>
        <html>
        <head><title>Sửa Ghi chú</title></head>
        <body>
            <h1>Sửa Ghi chú</h1>
            <form action="/edit/${note._id}" method="POST">
                <label>Tiêu đề: <input type="text" name="title" value="${note.title || ''}" required></label><br><br>
                <label>Hình thu nhỏ (URL): <input type="text" name="thumbnail" value="${note.thumbnail || ''}"></label><br><br>
                <label>Nội dung: <textarea name="content">${note.content || ''}</textarea></label><br><br>
                <label>Trạng thái: 
                    <select name="status">
                        <option value="public" ${note.status === 'public' ? 'selected' : ''}>Công khai</option>
                        <option value="private" ${note.status === 'private' ? 'selected' : ''}>Riêng tư</option>
                    </select>
                </label><br><br>
                <button type="submit">Cập nhật</button>
            </form>
            <br>
            <a href="/index">Quay lại danh sách</a>
        </body>
        </html>
    `;
};
