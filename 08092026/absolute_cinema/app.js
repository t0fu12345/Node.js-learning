const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./routes/user.route');
const cinemaRoutes = require('./routes/cinema.route');

// Route web /users
app.use('/users', userRoutes);
// Route api /api/cinemas
app.use('/api/cinemas', cinemaRoutes);

const homeRoutes = require('./routes/home.route');
app.use('/', homeRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route không tồn tại" });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`- Users View: http://localhost:${PORT}/users/index`);
    console.log(`- Cinemas API: http://localhost:${PORT}/api/cinemas`);
});
