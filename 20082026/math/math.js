const http = require('http');
const fibonacci = require('./fibonacci');
const tamgiac = require('./tamgiac');
const songuyento = require('./songuyento');
const thongke = require('./thongke');
const cuuchuong = require('./cuuchuong');
const palindrome = require('./palindrome');
const PORT = 3000;

const server = http.createServer((req, res) => {
    const baseURL = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseURL);

    const pathname = parsedUrl.pathname;
    const method = req.method;

    console.log(`Nhận dc request:[${method}]${req.url}`);

    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    if (pathname === '/') {
        res.writeHead(200);
        res.end(`<h1>Home</h1>
        <a href="/fibonacci?n=10">Đến trang Fibonacci</a><br>
        <a href="/tamgiac?n=5&type=vuong ">Đến trang Tam giác</a><br>
        <a href="/songuyento?n=30">Đến trang Số nguyên tố</a><br>
        <a href="/thongke?numbers=5,12,3,8,21,4">Đến trang Thống kê</a><br>
        <a href="/cuuchuong?n=7">Đến trang Cửu chương</a><br>
        <a href="/palindrome?text=radars">Đến trang Palindrome</a>`);
    } else if (pathname === '/fibonacci') {
        fibonacci(req, res);
    } else if (pathname === '/tamgiac') {
        tamgiac(req, res);
    } else if (pathname === '/songuyento') {
        songuyento(req, res);
    } else if (pathname === '/thongke') {
        thongke(req, res);
    } else if (pathname === '/cuuchuong') {
        cuuchuong(req, res);
    } else if (pathname === '/palindrome') {
        palindrome(req, res);
    } else {
        res.writeHead(404);
        res.end(`<h1>404 - Không tìm thấy trang</h1>`);
    }
});

server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});