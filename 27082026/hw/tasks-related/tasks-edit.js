const tasksEdit = (req, res, task) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    if (!task) {
        res.writeHead(404);
        return res.end(`
            <!DOCTYPE html>
            <html lang="vi">
            <head><meta charset="UTF-8"><title>Không tìm thấy</title></head>
            <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
                <h1 style="color: red;">Không tìm thấy công việc!</h1>
                <p>Công việc có ID này không tồn tại hoặc đã bị xóa.</p>
                <a href="/tasks">Quay lại danh sách</a>
            </body>
            </html>
        `);
    }

    res.writeHead(200);

    const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sửa công việc</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 500px; margin: 40px auto; padding: 25px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
            h1 { text-align: center; color: #ffc107; margin-bottom: 20px; }
            .form-group { margin-bottom: 15px; }
            label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
            input[type="text"], input[type="date"], textarea { width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; font-size: 15px; outline: none; }
            input:focus, textarea:focus { border-color: #007bff; }
            textarea { min-height: 80px; resize: vertical; font-family: Arial, sans-serif; }
            select { width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; font-size: 15px; }
            button { width: 100%; padding: 12px; background-color: #ffc107; color: #333; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: bold; margin-top: 10px; }
            button:hover { background-color: #e0a800; }
            .back-link { text-align: center; margin-top: 15px; font-size: 14px; }
            .back-link a { color: #6c757d; text-decoration: none; }
            .back-link a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <h1>Sửa Công Việc #${task.id}</h1>
        <form action="/tasks/edit?id=${task.id}" method="POST">
            <div class="form-group">
                <label for="name">Tên công việc:</label>
                <input type="text" id="name" name="name" value="${task.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="description">Mô tả:</label>
                <textarea id="description" name="description">${task.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="assignee">Người thực hiện:</label>
                <input type="text" id="assignee" name="assignee" value="${task.assignee || ''}">
            </div>
            <div class="form-group">
                <label for="startDate">Ngày bắt đầu:</label>
                <input type="date" id="startDate" name="startDate" value="${task.startDate || ''}">
            </div>
            <div class="form-group">
                <label for="dueDate">Hạn hoàn thành:</label>
                <input type="date" id="dueDate" name="dueDate" value="${task.dueDate || ''}">
            </div>
            <div class="form-group">
                <label for="status">Trạng thái:</label>
                <select id="status" name="status">
                    <option value="Ongoing" ${task.status === 'Ongoing' ? 'selected' : ''}>Ongoing</option>
                    <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </div>
            <button type="submit">Cập nhật công việc</button>
            <div class="back-link">
                <a href="/tasks">Hủy & Quay lại danh sách</a>
            </div>
        </form>
    </body>
    </html>
    `;

    res.end(html);
};

module.exports = tasksEdit;
