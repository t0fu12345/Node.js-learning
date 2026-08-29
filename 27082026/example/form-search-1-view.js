const formSearch1View = (req, res) => {
    const baseURL = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseURL);
    var searchParams = parsedUrl.searchParams.get('s');
    if (searchParams == null) {
        searchParams = "";
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200);
    res.end(`
    <!DOCTYPE html>
    <html lang="vi">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tìm kiếm Page</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 500px;
                margin: 60px auto;
                padding: 20px;
                text-align: center;
            }
            h1 {
                color: #333;
                margin-bottom: 20px;
            }
            .form-group {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                margin-top: 20px;
            }
            input[type="text"], input[type="number"] {
                flex: 1;
                padding: 10px 14px;
                font-size: 16px;
                border: 1px solid #ccc;
                border-radius: 4px;
                outline: none;
            }
            input:focus {
                border-color: #007bff;
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: 0.2s;
            }
            button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>

    <body>
        <h1>Noi dung tìm Kiếm: ${searchParams}</h1>
    </body>
    </html>
    `);
};

module.exports = formSearch1View;