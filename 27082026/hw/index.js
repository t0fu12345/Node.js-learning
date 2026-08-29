const http = require('http');
const querystring = require('querystring');
const tasks = require('./tasks-related/tasks-data');
const tasksView = require('./tasks-related/tasks-view');
const tasksSearch = require('./tasks-related/tasks-search');
const tasksDetailView = require('./tasks-related/tasks-detail-view');
const tasksCreate = require('./tasks-related/tasks-create');
const tasksEdit = require('./tasks-related/tasks-edit');
const userRegister = require('./user-related/user-register');
const userRegisterSuccess = require('./user-related/user-register-success');
const userLogin = require('./user-related/user-login');
const userProfile = require('./user-related/user-profile');

const PORT = 3000;
const users = [];

const server = http.createServer((req, res) => {
    const baseURL = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseURL);
    const url = parsedUrl.pathname;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(200);
        res.end('<h1>Hệ thống quản lý công việc</h1>');
    } else if (url === '/tasks' && method === 'GET') {
        tasksView(req, res, tasks);
    } else if (url === '/tasks/search' && method === 'GET') {
        tasksSearch(req, res, tasks);
    } else if (url === '/tasks/detail' && method === 'GET') {
        const idParam = parsedUrl.searchParams.get('id');
        const taskId = parseInt(idParam, 10); //ban dau ?id=1 thi 1 la string con trong data la number nen can ep kieu ve he so thap phan 

        const task = tasks.find(t => t.id === taskId); //tim id trong data

        tasksDetailView(req, res, task);
    } else if (url === "/tasks/create" && method === "GET") {
        tasksCreate(req, res);
    } else if (url === "/tasks/create" && method === "POST") {
        let body = '';
        req.on('data', (chunk) => {
            console.log('du lieu chunk: ' + chunk);
            body += chunk;
        })
        req.on('end', () => {
            const formData = querystring.parse(body);
            const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1; // tao id moi

            const newTask = {
                id: newId,
                name: formData.name,
                description: formData.description,
                assignee: formData.assignee,
                startDate: formData.startDate,
                dueDate: formData.dueDate,
                status: formData.status
            };
            tasks.push(newTask);

            res.writeHead(302, { 'Location': '/tasks' });
            res.end();
        })
    } else if (url === '/tasks/edit' && method === 'GET') {
        const idParam = parsedUrl.searchParams.get('id');
        const taskId = parseInt(idParam, 10);

        const task = tasks.find(t => t.id === taskId);
        tasksEdit(req, res, task);
    } else if (url === '/tasks/edit' && method === 'POST') {
        const idParam = parsedUrl.searchParams.get('id');
        const taskId = parseInt(idParam, 10);

        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
            const formData = querystring.parse(body);
            const taskIndex = tasks.findIndex(t => t.id === taskId);

            if (taskIndex !== -1) {
                tasks[taskIndex].name = formData.name;
                tasks[taskIndex].description = formData.description;
                tasks[taskIndex].assignee = formData.assignee;
                tasks[taskIndex].startDate = formData.startDate;
                tasks[taskIndex].dueDate = formData.dueDate;
                tasks[taskIndex].status = formData.status;
            }

            res.writeHead(302, { 'Location': '/tasks' });
            res.end();
        })
    } else if (url === '/tasks/delete' && method === 'GET') {
        const idParam = parsedUrl.searchParams.get('id');
        const taskId = parseInt(idParam, 10);

        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
        }

        res.writeHead(302, { 'Location': '/tasks' });
        res.end();
    } else if (url === '/user/register' && method === 'GET') {
        userRegister(req, res);
    } else if (url === '/user/register' && method === 'POST') {
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
            const formData = querystring.parse(body);
            users.push(formData);
            userRegisterSuccess(req, res, formData);
        })
    } else if (url === '/user/login' && method === 'GET') {
        userLogin(req, res);
    } else if (url === '/user/login' && method === 'POST') {
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
            const formData = querystring.parse(body);
            const user = users.find(u => u.email === formData.email && u.password === formData.password);

            if (user) {
                res.setHeader('Set-Cookie', `email=${user.email}; Path=/; HttpOnly`);
                res.writeHead(302, { 'Location': '/user/profile' });
            } else {
                res.writeHead(302, { 'Location': '/user/login' });
            }
            res.end();
        })
    } else if (url === '/user/logout' && method === 'GET') {
        res.setHeader('Set-Cookie', 'email=; Path=/; HttpOnly; Max-Age=0');
        res.writeHead(302, { 'Location': '/' });
        res.end();
    } else if (url === '/user/profile' && method === 'GET') {
        const cookies = req.headers.cookie;
        let email = '';
        if (cookies) {
            const emailCookie = cookies.split(';').find(c => c.trim().startsWith('email='));
            if (emailCookie) {
                email = emailCookie.split('=')[1];
            }
        }
        const user = users.find(u => u.email === email);
        if (!user) { // TH ma ng dung go /user/profile khi ma chx register/login
            res.writeHead(302, { 'Location': '/user/login' });
            res.end();
            return;
        }
        userProfile(req, res, user);
    } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.writeHead(404);
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});