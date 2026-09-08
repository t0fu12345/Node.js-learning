const index = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Trang chủ</title></head>
        <body>
            <h1>Chào mừng đến với Absolute Cinema</h1>
            <a href="/users/index">Quản lý Người dùng</a><br><br>
            <a href="/api/cinemas">Quản lý Rạp chiếu phim</a>
        </body>
        </html>
    `);
};

module.exports = {
    index
};
