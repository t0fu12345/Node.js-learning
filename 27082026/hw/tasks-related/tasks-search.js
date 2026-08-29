const tasksView = require('./tasks-view');

const tasksSearch = (req, res, tasks) => {
    /**
     * Ghi chú Tìm kiếm:
     * Logic filter kết hợp 2 điều kiện (AND):
     * 1. keyword: Tìm kiếm theo tên (name) hoặc người thực hiện (assignee).
     * 2. status: Tìm theo trạng thái.
     * 
     * Ví dụ URL test: /tasks/search?keyword=node&status=ongoing
     */
    const baseURL = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url, baseURL);
    const keyword = parsedUrl.searchParams.get('keyword') || '';
    const status = parsedUrl.searchParams.get('status') || '';

    const kw = keyword.toLowerCase();
    const st = status.toLowerCase(); //chuan hoa du lieu vd status:Available -> available

    const filteredTasks = tasks.filter(task => {
        const matchKeyword = task.name.toLowerCase().includes(kw) ||
            task.assignee.toLowerCase().includes(kw);
        const matchStatus = task.status.toLowerCase().includes(st);

        return matchKeyword && matchStatus;
    });

    tasksView(req, res, filteredTasks);
};

module.exports = tasksSearch;