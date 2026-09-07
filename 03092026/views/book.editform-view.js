const EditFormView = (book) => {
    let htmlContent = `<h1>Sửa sách</h1>
                <form action='/books/edit/${book.id}' method='POST'>
                    <label>Tên sách</label>
                    <input type='text' name='title' value='${book.title}'><br>
                    <label>Tên tác giả</label>
                    <input type='text' name='author' value='${book.author}'><br>
                    <label>Giá sách</label>
                    <input type='text' name='price' value='${book.price}'><br>
                    <label>Năm xuất bản</label>
                    <input type='text' name='year' value='${book.year}'><br>
                    <button type='submit'>Update</button>
                </form>
            `;
    return htmlContent;
}
module.exports = EditFormView;