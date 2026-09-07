const AllBooksView = require('../views/book.allbooks-view.js');
const BookDetailView = require('../views/book.bookdetail-view.js');
const CreateFormView = require('../views/book.CreateForm-view.js');
const EditFormView = require('../views/book.editform-view.js');

let books = [
    { id: 1, title: 'Node.js cơ bản', author: 'Nguyễn Văn A', price: 50000, year: 2022 },
    { id: 2, title: 'Express.js thực chiến', author: 'Trần Văn B', price: 80000, year: 2023 }
]

const getAllBooks = (req, res) => {
    const html = AllBooksView(books);
    res.send(html);
}

const getBookDetail = (req, res) => {
    const bookId = parseInt(req.params.id); //lay id tu url
    const book = books.find(b => b.id === bookId);

    if (book) {
        const html = BookDetailView(book);
        res.send(html);
    } else res.status(404).send(`<h1>Ko tìm thấy sách</h1>`);
}

const getCreateForm = (req, res) => {
    const html = CreateFormView();
    res.send(html);
}

const createBook = (req, res) => {
    const { title, author, price, year } = req.body;
    books.push({
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title: title,
        author: author,
        price: price,
        year: year
    })
    res.redirect('/books');
}

const getEditForm = (req, res) => {
    const bookId = parseInt(req.params.id); //lay id tu url
    const book = books.find(b => b.id === bookId);

    if (book) {
        const html = EditFormView(book);
        res.send(html);
    } else {
        res.status(404).send('<h1>Ko tìm thấy sách</h1>')
    }
}

const updateBook = (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id == bookId);
    if (index !== -1) {
        books[index].title = req.body.title;
        books[index].author = req.body.author;
        books[index].price = req.body.price;
        books[index].year = req.body.year;
        res.redirect('/books');
    } else {
        res.status(404).send(`<h1>Ko tìm thấy sách</h1>`);
    }
}

const deleteBook = (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(b => b.id !== bookId);
    res.redirect('/books');
}

module.exports = {
    getAllBooks,
    getCreateForm,
    createBook,
    getBookDetail,
    getEditForm,
    updateBook,
    deleteBook
};