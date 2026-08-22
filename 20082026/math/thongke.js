const thongke = (req, res) => {
    // http://localhost:3000/thongke?numbers=5,12,3,8,21,4
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;
    const numbersStr = parsedUrl.searchParams.get('numbers');

    if (method === 'GET') {
        const arr = numbersStr.split(',').map(Number);

        let max = arr[0];
        let min = arr[0];
        let sum = 0;
        const evens = [];

        for (let i = 0; i < arr.length; i++) {
            const num = arr[i];

            if (num > max) {
                max = num;
            }

            if (num < min) {
                min = num;
            }

            sum += num;

            if (num % 2 === 0) {
                evens.push(num);
            }
        }

        const result = {
            original: arr,
            max: max,
            min: min,
            sum: sum,
            evens: evens
        };

        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(result));
    }
}
module.exports = thongke;