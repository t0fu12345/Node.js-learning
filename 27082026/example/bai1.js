const http = require('http');
const formSearch1 = require('./form-search-1');
const formSearch1View = require('./form-search-1-view');
const formRegisterView = require('./form-register-view');
const formRegisterSuccess = require('./form-register-success');
const formLoginView = require('./form-login-view');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const baseURL = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseURL);
    const url = parsedUrl.pathname;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(200);
        res.end('<h1>Welcome to learn NodeJS</h1>');
    } else if (url == '/search' && method === 'GET') {
        const searchParams = parsedUrl.searchParams.get('s');
        console.log("Tim kiem: " + searchParams);

        if (searchParams == null || searchParams === "") {
            formSearch1(req, res);
        } else {
            formSearch1View(req, res);
        }
    } else if (url === '/user/register' && method === 'GET') {
        formRegisterView(req, res);
    } else if (url === '/user/register' && method === 'POST') {
        // Lay du lieu tu form: fullname, email, password, dob, address
        let body = '';
        req.on('data', (chunk) => {
            console.log('du lieu chunk: ' + chunk);
            body += chunk;
        })

        req.on('end', () => {
            const parsedBody = new URLSearchParams(body);
            const fullname = parsedBody.get('fullname') || '';
            const email = parsedBody.get('email') || '';
            const password = parsedBody.get('password') || '';
            const dob = parsedBody.get('dob') || '';
            const address = parsedBody.get('address') || '';

            console.log('name: ' + fullname);
            console.log('email: ' + email);
            console.log('password: ' + password);
            console.log('dob: ' + dob);
            console.log('address: ' + address);

            // Luu thong tin vao cookie
            res.setHeader('Set-Cookie', [
                `name=${fullname}; Max-Age=100`,
                `email=${email}; Max-Age=100`,
                `password=${password}; Max-Age=100`,
                `dob=${dob}; Max-Age=100`,
                `address=${address}; Max-Age=100`
            ]);

            // formRegisterSuccess(req, res, { fullname, email, password, dob, address });
            //Chuyen sang trang user/login
            res.writeHead(302, {
                'Location': '/user/login'
            });
            res.end();
        })
    } else if (url === '/user/login' && method === 'GET') {
        formLoginView(req, res);
    } else if (url === '/user/login' && method === 'POST') {
        // Lay du lieu tu form login: email, password
        let body = '';
        req.on('data', (chunk) => {
            console.log('du lieu chunk: ' + chunk);
            body += chunk;
        })

        req.on('end', () => {
            const parsedBody = new URLSearchParams(body);
            const email = parsedBody.get('email') || '';
            const password = parsedBody.get('password') || '';

            console.log('email: ' + email);
            console.log('password: ' + password);

            // Lay du lieu tu cookie
            const cookies = req.headers.cookie ? req.headers.cookie.split(';').map(c => c.trim()) : [];
            const nameCookie = cookies.find(cookie => cookie.startsWith('name='))?.split('=')[1] || '';
            const emailCookie = cookies.find(cookie => cookie.startsWith('email='))?.split('=')[1] || '';
            const passwordCookie = cookies.find(cookie => cookie.startsWith('password='))?.split('=')[1] || '';
            const dobCookie = cookies.find(cookie => cookie.startsWith('dob='))?.split('=')[1] || '';
            const addressCookie = cookies.find(cookie => cookie.startsWith('address='))?.split('=')[1] || '';

            if (email === emailCookie && password === passwordCookie) {
                formRegisterSuccess(req, res, { name: nameCookie, email: emailCookie, password: passwordCookie, dob: dobCookie, address: addressCookie });
            } else {
                res.writeHead(302, {
                    'Location': '/user/login'
                });
                res.end();
            }
        })
    } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(404);
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});