const CreateFormView = () => {
    let htmlContent = `
            <h1>Thêm sách</h1>
            <form action='/books/create' method='POST'>
                <label>Tên sách</label>
                <input type='text' name='title' required><br>
                <label>Tên tác giả</label>
                <input type='text' name='author' required><br>
                <label>Giá sách</label>
                <input type='text' name='price' required><br>
                <label>Năm xuất bản</label>
                <input type='text' name='year' required><br>
                <button type='submit'>Thêm mới</button>
            </form>
        `;
    return htmlContent;
}
module.exports = CreateFormView;