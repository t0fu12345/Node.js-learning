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
        const searchQuery = parsedURL.searchParams.get('search'); // vi du /books?search=node thi searchQuery la 'node'

        const rawCookies = req.headers.cookie;
        const cookies = parseCookies(rawCookies);
        const favouriteCategory = cookies['favourite_category'];

        let resultBooks = books;

        if (searchQuery) {
            resultBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
        } else if (favouriteCategory) {
            resultBooks = books.filter(book => book.category === favouriteCategory)
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        let htmlContent = `
            <h1>Danh sách Cửa Hàng Sách</h1>
            
            <!-- Phần chọn sở thích -->
            <div style="margin-bottom: 20px; padding: 10px; background: #f0f0f0;">
                <strong>Chọn thể loại yêu thích:</strong>
                <a href="/set-category?category=LapTrinh"><button>Sách Lập Trình</button></a>
                <a href="/set-category?category=LichSu"><button>Sách Lịch Sử</button></a>
                <a href="/set-category?category="><button>Xóa sở thích</button></a>
            </div>

            <form action="/books" method="GET">
                <input type="text" name="search" placeholder="Nhập tên sách..." value="${searchQuery || ''}">
                <button type="submit">Tìm kiếm</button>
            </form>
            <ul>
        `;

        if (resultBooks.length > 0) {
            resultBooks.forEach(book => {
                htmlContent += `<li>${book.title} (Thể loại: ${book.category})</li>`;
            });
        } else {
            htmlContent += `<p>Không tìm thấy sách!</p>`;
        }

        res.end(htmlContent + `</ul>`);
    } else if (url === '/set-category' && method === 'GET') {
        const setCategory = parsedURL.searchParams.get('category');
        if (setCategory) {
            res.writeHead(302, {
                'location': '/books',
                'Set-Cookie': `favourite_category=${setCategory};Path=/`
            })
            res.end();
        } else {
            res.writeHead(302, { 'Location': '/books' });
            res.end();
        }
    } else if (url === '/add-book' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>Thêm Sách Mới</h1>
            <form action="/add-book" method="POST">
            <div>
                <label>Tên sách:</label>
                <input type="text" name="title" placeholder="Nhập tên sách..." required />
            </div><br />
            <div>
                <label>Tác giả:</label>
                <input type="text" name="author" placeholder="Nhập tên tác giả..." required />
            </div><br />
            <div>
                <label>Thể loại:</label>
                <input type="text" name="category" placeholder="Nhập thể loại..." required />
            </div><br />
        <button type="submit">Thêm sách</button>
    </form>
`);
    } else if (url === '/add-book' && method === 'POST') {
        const rawCookies = req.headers.cookie;
        const cookies = parseCookies(rawCookies);
        const role = cookies['role'];

        if (role !== 'admin') {
            res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<h2>Bạn không có quyền thêm sách! Vui lòng đăng nhập Admin.</h2>`);
            return;
        }

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            const formData = querystring.parse(body);

            books.push({
                id: books.length + 1,
                title: formData.title,
                author: formData.author,
                category: formData.category
            });
            res.writeHead(302, { 'Location': '/books' });
            res.end();
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h2>404 - Đường dẫn không tồn tại</h2>`);
    }
})
server.listen(PORT, () => {
    console.log(`Server đang lắng nghe tại: http://localhost:${PORT}/login`);
});