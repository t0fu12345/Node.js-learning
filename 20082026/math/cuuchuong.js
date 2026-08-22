const cuuchuong = (req, res) => {
    //http://localhost:3000/cuuchuong?n=7
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;
    const n = parsedUrl.searchParams.get('n');

    if (method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        let html = '<h1>Bảng cửu chương</h1>';

        if (n) {
            const num = parseInt(n, 10);
            if (!isNaN(num) && num >= 1 && num <= 10) {
                html += `<h2>Bảng cửu chương ${num}</h2>`;
                let i = 1;
                while (i <= 10) {
                    html += `<p style="margin: 2px 0;">${num} x ${i} = ${num * i}</p>`;
                    i++;
                }
            }
        } else {
            let i = 1;
            while (i <= 10) {
                html += `<div style="display:inline-block; margin: 10px 30px 20px 0; vertical-align: top; border: 1px solid #ccc; padding: 10px;">`;
                html += `<h2 style="margin-top: 0;">Bảng ${i}</h2>`;
                let j = 1;
                while (j <= 10) {
                    html += `<p style="margin: 2px 0;">${i} x ${j} = ${i * j}</p>`;
                    j++;
                }
                html += `</div>`;
                i++;
            }
        }

        res.end(html);
    }
};
module.exports = cuuchuong;
