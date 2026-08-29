const tasksView = (req, res, tasks = []) => {
    let html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Danh sách công việc</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #007bff; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            tr:hover { background-color: #f1f1f1; }
        </style>
    </head>
    <body>
        <h1>Danh sách tất cả công việc</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên công việc</th>
                    <th>Mô tả</th>
                    <th>Người thực hiện</th>
                    <th>Ngày bắt đầu</th>
                    <th>Hạn hoàn thành</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                ${tasks.map(task => `
                    <tr>
                        <td>${task.id}</td>
                        <td>${task.name}</td>
                        <td>${task.description}</td>
                        <td>${task.assignee}</td>
                        <td>${task.startDate}</td>
                        <td>${task.dueDate}</td>
                        <td>${task.status}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200);
    res.end(html);
};

module.exports = tasksView;
