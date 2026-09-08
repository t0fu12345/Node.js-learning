const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const noteRoutes = require('./note.route');
app.use('/', noteRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route không tồn tại" });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});

