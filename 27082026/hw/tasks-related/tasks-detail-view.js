const tasksDetailView = (req, res, task) => {
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
        <title>Chi tiết công việc</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; display: flex; justify-content: center;}
            .card { border: 1px solid #ddd; padding: 25px; border-radius: 8px; max-width: 500px; width: 100%; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #007bff; margin-top: 0; text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
            .item { margin-bottom: 15px; font-size: 16px; border-bottom: 1px dashed #eee; padding-bottom: 5px;}
            .label { font-weight: bold; width: 150px; display: inline-block; color: #555; }
            .btn-group { text-align: center; margin-top: 20px; }
            a.btn { display: inline-block; padding: 10px 20px; background-color: #6c757d; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;}
            a.btn:hover { background-color: #5a6268; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Chi tiết công việc #${task.id}</h1>
            <div class="item"><span class="label">Tên công việc:</span> ${task.name}</div>
            <div class="item"><span class="label">Mô tả:</span> ${task.description}</div>
            <div class="item"><span class="label">Người thực hiện:</span> ${task.assignee}</div>
            <div class="item"><span class="label">Ngày bắt đầu:</span> ${task.startDate}</div>
            <div class="item"><span class="label">Hạn hoàn thành:</span> ${task.dueDate}</div>
            <div class="item"><span class="label">Trạng thái:</span> 
                <span style="background-color: #17a2b8; color: white; padding: 3px 8px; border-radius: 12px; font-size: 14px;">${task.status}</span>
            </div>
            
            <div class="btn-group">
                <a href="/tasks" class="btn">Quay lại danh sách</a>
            </div>
        </div>
    </body>
    </html>
    `;

    res.end(html);
};

module.exports = tasksDetailView;
