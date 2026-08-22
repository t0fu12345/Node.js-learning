const fibonacci = (req, res) => {
    //http://localhost:3000/fibonacci?n=10
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;

    if (method === 'GET') {
        const n = parsedUrl.searchParams.get('n');
        const num = parseInt(n, 10);

        let result = 0;
        if (num === 0) {
            result = 0;
        } else if (num === 1) {
            result = 1;
        } else {
            let prev = 0;
            let cur = 1;
            for (let i = 2; i <= num; i++) {
                let temp = cur + prev;
                prev = cur;
                cur = temp;
            }
            result = cur;
        }

        res.writeHead(200);
        res.end(`<h1>${result}</h1>`);
    } else {
        res.writeHead(404);
        res.end(`<h1>404 - Không tìm thấy trang</h1>`);
    }
};

module.exports = fibonacci;