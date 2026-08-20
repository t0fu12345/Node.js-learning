const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    if (url === '/' && method === 'GET') {
        res.writeHead(200);
        res.end('<h1>Student Mangement System</h1><a href="/students">Danh sach sinh vien</a>')
    } else if (url === '/students' && method === 'GET') {
        res.writeHead(200);
        res.end(`<h1>Danh sach sinh vien</h1>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ma sinh vien</th>
                        <th>Ho ten</th>
                        <th>Email</th>
                        <th>SDT</th>
                        <th>Chuc nang</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>SV001</td>
                        <td>Nguyen Van An</td>
                        <td>an@gmail.com</td>
                        <td>091</td>
                        <td>
                            <button><a href="/student/edit/1">Sua</a></button>
                            <button><a href="/students/delete/1">Xoa</a></button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>SV002</td>
                        <td>Tran Van Binh</td>
                        <td>binh@gmail.com</td>
                        <td>092</td>
                        <td>
                            <button><a href="/student/edit/2">Sua</a></button>
                            <button><a href="/students/delete/2">Xoa</a></button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>SV003</td>
                        <td>Le Van Cuong</td>
                        <td>cuong@gmail.com</td>
                        <td>093</td>
                        <td>
                            <button><a href="/student/edit/3">Sua</a></button>
                            <button><a href="/students/delete/3">Xoa</a></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button><a href="/students/create">Them sinh vien</a></button>
            <button><a href="/">Quay lai</a></button>
            `);
    } else if (url === '/students/create' && method === 'GET') {
        res.writeHead(200);
        res.end(`<h1>Form</h1>
            <form>            
                <label>Ma sinh vien</label><br>
                <input type="text"><br>
                <label>Ho ten</label><br>
                <input type="text"><br>
                <label>Email</label><br>
                <input type="email"><br>
                <label>SDT</label><br>
                <input type="tel"><br>
                <label>Ngay sinh</label><br>
                <input type="datetime-local"><br>
                <label>Dia chi</label><br>
                <input type="text"><br>
            </form><br>
            <button>Them sinh vien</button>
            <button><a href="/students">Quay lai</a></button>
        `)
    } else if (url === '/student/edit/1' && method === 'GET') {
        res.writeHead(200);
        res.end(`<h1>Sua sinh vien</h1>
            <form>            
                <label>Ma sinh vien</label><br>
                <input type="text" value="SV001"><br>
                <label>Ho ten</label><br>
                <input type="text" value="Nguyen Van An"><br>
                <label>Email</label><br>
                <input type="email" value="an@gmail.com"><br>
                <label>SDT</label><br>
                <input type="tel" value="091"><br>
                <label>Ngay sinh</label><br>
                <input type="date" value="2001-01-01"><br>
                <label>Dia chi</label><br>
                <input type="text" value="HN"><br>
            </form><br>
            <button>Cap nhat</button>
            <a href="/students">Quay lai</a>
        `)
    } else if (url === '/students/delete/1' && method === 'GET') {
        res.writeHead(200);
        res.end(`<h1>Xoa sinh vien</h1>
            <p>Ban co chac chan muon xoa sinh vien co ID = 1?</p>
            <button>Xac nhan xoa</button>
            <button><a href="/students">Huy</a></button>
            `)
    }
})

server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});