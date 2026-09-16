const { renderLayout } = require('../../core/utils/layout.view');

const renderTables = (tables, user) => {
    const rows = tables.map(t => {
        return `
            <tr>
                <td>${t.tableName}</td>
                <td>${t.capacity}</td>
                <td style="color: ${t.status === 'AVAILABLE' ? 'green' : 'red'}; font-weight: bold;">
                    ${t.status === 'AVAILABLE' ? 'Trống' : 'Đang phục vụ'}
                </td>
                <td>
                    <form action="/manage/tables/${t._id}/status?_method=PATCH" method="POST" style="display:inline;">
                        <input type="hidden" name="status" value="${t.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE'}">
                        <button type="submit" class="btn" style="padding: 4px 8px;">Đổi trạng thái</button>
                    </form>
                </td>
            </tr>
        `;
    }).join('');

    const body = `
        <h2>Quản lý Bàn (Staff/Admin)</h2>
        <div class="card" style="max-width: 400px;">
            <h3>Thêm bàn mới</h3>
            <form action="/manage/tables" method="POST" style="display:flex; gap:10px;">
                <input type="text" name="tableName" placeholder="Tên bàn" required>
                <input type="number" name="capacity" placeholder="Số ghế" required style="width: 80px;">
                <button type="submit" class="btn btn-success">Thêm</button>
            </form>
        </div>

        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th>Tên bàn</th>
                        <th>Sức chứa</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;
    return renderLayout('Quản lý Bàn', body, user);
};

module.exports = { renderTables };
