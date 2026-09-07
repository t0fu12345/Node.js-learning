const express = require('express');
const app = express();
const port = 3000;

const bookController = require('./controllers/book.controller');

app.use(express.urlencoded({ extended: true }));

app.get('/books', bookController.getAllBooks);

app.get('/books/create', bookController.getCreateForm);
app.post('/books/create', bookController.createBook);

app.get('/books/:id', bookController.getBookDetail);

app.get('/books/edit/:id', bookController.getEditForm);
app.post('/books/edit/:id', bookController.updateBook);

app.get('/books/delete/:id', bookController.deleteBook);

app.listen(port, () => {
  console.log(`Server đang chạy tại: http://localhost:${port}`);
});
