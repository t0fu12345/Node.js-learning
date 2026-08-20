const http = require('http');
const { PassThrough } = require('stream');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // req.headers.host chính là 'localhost:3000'
    const baseURL = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseURL);

    const pathname = parsedUrl.pathname; // Kết quả sẽ là: '/users'
    const method = req.method;           // Kết quả sẽ là: 'GET'

    console.log(`[${method}] Nhận được request tới: ${req.url}`);

    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    if (pathname === '/users' && method === 'GET') {
        const data = {
            username: parsedUrl.searchParams.get('username'),
            role: parsedUrl.searchParams.get('role'),
            active: parsedUrl.searchParams.get('active')
        }
        res.writeHead(200);
        res.end(`<h1>URL data</h1>
            <h2>username:${data.username}</h2>
            <h2>role:${data.role}</h2>
            <h2>active:${data.active}</h2>
            `)
    } else if (pathname === '/products' && method === 'GET') {
        const data = {
            category: parsedUrl.searchParams.get('category'),
            price_min: parsedUrl.searchParams.get('price_min'),
            sort: parsedUrl.searchParams.get('sort'),
            page: parsedUrl.get('page')
        }
        res.writeHead(200);
        res.end(`<h1>URL data</h1>
            <h2>category:${data.category}</h2>
            <h2>price_min:${data.price_min}</h2>
            <h2>sort:${data.sort}</h2>
            <h2>page:${data.page}</h2>
            `)
    } else if (pathname === '/search' && method === 'GET') {
        const data = {
            keyword: parsedUrl.searchParams.get('keyword'),
            tags: parsedUrl.searchParams.getAll('tags')
        }
        res.writeHead(200);
        res.end(`<h1>URL data</h1>
            <h2>keyword:${data.keyword}</h2>
            <h2>tags:${data.tags.join(',')}</h2>
            `)
    } else if (pathname === '/orders' && method === 'GET') {
        //url:http://localhost:3000/orders?status=completed&payment=credit_card
        const data = {
            status: parsedUrl.searchParams.get('status'),
            payment: parsedUrl.searchParams.get('payment')
        }
        res.writeHead(200);
        res.end(`<h1>URL data</h1>
            <h2>status:${data.status}</h2>
            <h2>payment:${data.payment}</h2>
            `)
    } else if (pathname === '/reports' && method === 'GET') {
        //url:http://localhost:3000/reports?start_date=2024-01-01&end_date=2024-01-31&limit=50
        const data = {
            start_date: parsedUrl.searchParams.get('start_date'),
            end_date: parsedUrl.searchParams.get('end_date')
        }
        res.writeHead(200);
        res.end(`<h1>URL data</h1>
            <h2>start_date:${data.start_date}</h2>
            <h2>end_date:${data.end_date}</h2>
            `)
    } else if (pathname === '/hotels' && method === 'GET') {
        //url:http://localhost:3000/hotels?city=Ha%20Noi&has_pool=true&stars=4&stars=5
        const data = {
            city: parsedUrl.searchParams.get('city'),
            has_pool: parsedUrl.searchParams.get('has_pool'),
            stars: parsedUrl.searchParams.getAll('stars')
        }
        res.writeHead(200);
        res.end(`<h1>URL data</h1>
            <h2>city:${data.city}</h2>
            <h2>has_pool:${data.has_pool}</h2>
            <h2>stars:${data.stars.join(',')}</h2>
            `)
    } else {
        res.writeHead(404);
        res.end(`<h1>404 - Không tìm thấy trang</h1>`);
    }
})

server.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});