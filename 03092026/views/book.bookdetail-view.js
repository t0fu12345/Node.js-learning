const BookDetailView = (book) => {
    let htmlContent = `<h1>Chi tiết sách: ${book.title}</h1>
        <h2>Tác giả: ${book.author}</h2>
        <h2>Giá sách: ${book.price}</h2>
        <h2>Năm xuất bản: ${book.year}</h2>
        <a href="/books">Quay lại</a>`;
    return htmlContent;
}
module.exports = BookDetailView;