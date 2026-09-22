const Book = require('./book.model');

const createBook = async (req, res) => {
    try {
        const { title, author, category } = req.body;
        const newBook = new Book({ title, author, category });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        })
    }
}

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Không tìm thấy sách' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        })
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        if (!updatedBook) {
            return res.status(404).json({ message: 'Không tìm thấy sách' });
        }
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Không tìm thấy sách' });
        }
        res.json(deletedBook);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        })
    }
}

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook
}