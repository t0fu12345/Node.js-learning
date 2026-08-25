const http = require('http');
const querystring = require('querystring');
const PORT = 3000;

const books = [
    { id: 1, title: 'Lập trình Node.js căn bản', author: 'Nguyễn Văn A', category: 'LapTrinh' },
    { id: 2, title: 'Lịch sử thế giới', author: 'John Doe', category: 'LichSu' },
    { id: 3, title: 'Học JavaScript nâng cao', author: 'Trần Văn B', category: 'LapTrinh' }
];

function parseCookies(cookieString) {
    if (!cookieString) return {};
    const cookies = {};
    cookieString.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        const key = parts[0].trim();
        const value = parts[1] ? parts[1].trim() : '';
        cookies[key] = value;
    })
    return cookies;
}

const server = http.createServer((req, res) => {
    const baseURL = `http://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const url = parsedURL.pathname;
    const method = req.method;

    console.log(`Nhận được request: [${method}] ${req.url} -> Path: ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>Trang Chủ</h1><a href='/login'>Trang đăng nhập</a>`);
    } else if (url === '/login' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>Trang đăng nhập</h1>
            <form action='/login' method='POST'>
                <div>
                    <label>Tên đăng nhập:</label>
                    <input type='text' name='username' placeholder='Nhập username...' required />
                </div><br />
                <div>
                    <label>Mật khẩu:</label>
                    <input type='password' name='password' placeholder='Nhập mật khẩu...' required />
                </div><br />
                <button type='submit'>Đăng nhập</button>
            </form>
            `)
    } else if (url === '/login' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            const formData = querystring.parse(body);
            const username = formData.username;
            const password = formData.password;

            if (username === 'admin' && password === '123456') {
                res.writeHead(200, {
                    'Content-Type': 'text/html;charset=utf-8',
                    'Set-Cookie': 'role=admin;Path=/;HttpOnly'
                });
                res.end(`
                    <h2 style="color: green;">Đăng nhập thành công!</h2>
                    <p>Cookie đã được lưu vào trình duyệt của bạn (role=admin).</p>
                `);

            } else {
                res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <h2 style="color: red;">Tài khoản hoặc mật khẩu không chính xác</h2>
                    <a href="/login">Thử lại</a>
                `);
            }
        })
    } else if (url === '/books' && method === 'GET') {
        const searchQuery = parsedURL.searchParams.get('search');

        const rawCookies = req.headers.cookie;
        const cookies = parseCookies(rawCookies);
        const favouriteCategory = cookies['favourite_category'];
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h2>404 - Đường dẫn không tồn tại</h2>`);
    }
})
server.listen(PORT, () => {
    console.log(`Server đang lắng nghe tại: http://localhost:${PORT}/login`);
});