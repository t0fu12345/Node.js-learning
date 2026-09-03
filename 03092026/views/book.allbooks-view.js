const AllBooksView = (books) => {
    let htmlContent = `<h1>Danh sách Sách</h1><a href="/books/create">Thêm sách</a><hr><ul>`;
    books.forEach(b => {
        htmlContent += `<li>${b.title} - <a href="/books/${b.id}">Chi tiết</a> | <a href="/books/edit/${b.id}">Sửa</a> | <a href="/books/delete/${b.id}">Xóa</a></li>`;
    })
    htmlContent += `</ul>`;
    return htmlContent;
}
module.exports = AllBooksView;