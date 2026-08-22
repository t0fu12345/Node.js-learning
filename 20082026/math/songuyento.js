const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const songuyento = (req, res) => {
    //http://localhost:3000/songuyento?n=30
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;
    const n = parsedUrl.searchParams.get('n');
    const num = parseInt(n, 10);

    if (method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        if (isNaN(num) || num < 2) {
            res.writeHead(400, { 'Content-Type': 'application/json;charset=utf-8' });
            res.end(JSON.stringify({ error: "Vui lòng cung cấp tham số n hợp lệ (n >= 2)" }));
            return;
        }

        const primes = [];
        let i = 2;

        do {
            if (isPrime(i)) {
                primes.push(i);
            }
            i++;
        } while (i <= num);

        const result = {
            limit: num,
            count: primes.length,
            primes: primes
        };

        res.end(JSON.stringify(result));
    }
};
module.exports = songuyento;