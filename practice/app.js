require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');

const authRoutes = require('./routes/auth.route');
const bookRoutes = require('./routes/book.route');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server đang chạy ở http://localhost:${PORT}`);
})