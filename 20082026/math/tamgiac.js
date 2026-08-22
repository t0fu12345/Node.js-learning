const tamgiac = (req, res) => {
    //http://localhost:3000/tamgiac?n=5&type=vuong 
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;
    const n = parsedUrl.searchParams.get('n');
    const type = parsedUrl.searchParams.get('type');
    const num = parseInt(n, 10);

    if (method === 'GET') {
        if (type === 'vuong') {
            for (let i = 1; i <= num; i++) {
                let row = '';
                for (let j = 1; j <= i; j++) {
                    row += '* ';
                }
                res.write(`<p>${row}</p>`);
            }
        } else if (type === 'can') {
            for (let i = 1; i <= num; i++) {
                let row = '';
                for (let j = 1; j <= i; j++) {
                    row += '* ';
                }
                res.write(`<p>${row}</p>`);
            }
        } else if (type === 'nguoc') {
            for (let i = 1; i <= num; i++) {
                let row = '';
                for (let j = 1; j <= num - i + 1; j++) {
                    row += '* ';
                }
                res.write(`<p>${row}</p>`);
            }
        }
        res.end();
    }
}
module.exports = tamgiac;
