const tasksCreate = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200);

    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tạo công việc mới</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 500px;
                margin: 40px auto;
                padding: 25px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #f9f9f9;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            h1 {
                text-align: center;
                color: #007bff;
                margin-bottom: 20px;
            }
            .form-group {
                margin-bottom: 15px;
            }
            label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                color: #555;
            }
            input[type="text"],
            input[type="date"],
            textarea {
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 15px;
                outline: none;
            }
            input:focus,
            textarea:focus {
                border-color: #007bff;
            }
            textarea {
                min-height: 80px;
                resize: vertical;
            }
            button {
                width: 100%;
                padding: 12px;
                background-color: #28a745;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                margin-top: 10px;
                transition: background-color 0.2s;
            }
            button:hover {
                background-color: #218838;
            }
            .back-link {
                text-align: center;
                margin-top: 15px;
                display: block;
                font-size: 14px;
            }
            .back-link a {
                color: #6c757d;
                text-decoration: none;
            }
            .back-link a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <h1>Thêm Công Việc Mới</h1>
        <form action="/tasks/create" method="POST">
            <div class="form-group">
                <label for="name">Tên công việc:</label>
                <input type="text" id="name" name="name" placeholder="Ví dụ: Học Node.js" required>
            </div>
            <div class="form-group">
                <label for="description">Mô tả:</label>
                <textarea id="description" name="description" placeholder="Nhập mô tả chi tiết..."></textarea>
            </div>
            <div class="form-group">
                <label for="assignee">Người thực hiện:</label>
                <input type="text" id="assignee" name="assignee" placeholder="Nhập tên người thực hiện">
            </div>
            <div class="form-group">
                <label for="startDate">Ngày bắt đầu:</label>
                <input type="date" id="startDate" name="startDate">
            </div>
            <div class="form-group">
                <label for="dueDate">Hạn hoàn thành:</label>
                <input type="date" id="dueDate" name="dueDate">
            </div>
            <div class="form-group">
                <label for="status">Trạng thái:</label>
                <select id="status" name="status">
                    <option value="Ongoing">Ongoing</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <button type="submit">Lưu công việc</button>
            <div class="back-link">
                <a href="/tasks">Quay lại danh sách</a>
            </div>
        </form>
    </body>
    </html>
    `;

    res.end(html);
};

module.exports = tasksCreate;