const { renderLayout } = require('../../core/utils/layout.view');

const renderOrders = (orders, user, error = null) => {
    const errorMsg = error ? `<p style="color: red; font-weight: bold;">${error}</p>` : '';
    
    const rows = orders.map(order => {
        const itemsHtml = order.items.map(i => `<li>${i.snapshot_name} (x${i.quantity}) - ${(i.snapshot_price * i.quantity).toLocaleString()}</li>`).join('');
        
        let cancelBtn = '';
        if (order.status === 'PENDING') {
            cancelBtn = `
                <form action="/orders/${order._id}/cancel?_method=PATCH" method="POST" onsubmit="return confirm('Bạn chắc chắn muốn hủy đơn này?');">
                    <button type="submit" class="btn btn-danger" style="padding: 4px 8px;">Hủy đơn</button>
                </form>
            `;
        }

        return `
            <tr>
                <td>${order._id}</td>
                <td><ul>${itemsHtml}</ul></td>
                <td><b style="color:red;">${order.total_amount.toLocaleString()}</b></td>
                <td>${order.status}</td>
                <td>${new Date(order.createdAt).toLocaleString()}</td>
                <td>${cancelBtn}</td>
            </tr>
        `;
    }).join('');

    const body = `
        <h2>Lịch sử Đơn hàng của bạn</h2>
        ${errorMsg}
        <div class="card">
            ${orders.length > 0 ? `
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Chi tiết món</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Ngày đặt</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            ` : '<p>Bạn chưa có đơn hàng nào.</p>'}
        </div>
    `;
    return renderLayout('Lịch sử đơn hàng', body, user);
};

const renderManageOrders = (orders, user) => {
    const rows = orders.map(order => {
        const itemsHtml = order.items.map(i => `<li>${i.snapshot_name} (x${i.quantity})</li>`).join('');
        
        const statuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'];
        const statusOptions = statuses.map(s => `<option value="${s}" ${order.status === s ? 'selected' : ''}>${s}</option>`).join('');

        return `
            <tr>
                <td>${order._id}</td>
                <td>${order.userId?.username || 'Khách'}</td>
                <td><ul>${itemsHtml}</ul></td>
                <td>${order.total_amount.toLocaleString()}</td>
                <td>
                    <form action="/manage/orders/${order._id}/status?_method=PATCH" method="POST" style="display:flex; gap:5px;">
                        <select name="status" style="padding:4px;">
                            ${statusOptions}
                        </select>
                        <button type="submit" class="btn btn-success" style="padding: 4px 8px;">Cập nhật</button>
                    </form>
                </td>
            </tr>
        `;
    }).join('');

    const body = `
        <h2>Quản lý toàn bộ Đơn hàng (Staff/Admin)</h2>
        <div class="card">
            ${orders.length > 0 ? `
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Chi tiết</th>
                            <th>Tổng tiền</th>
                            <th>Cập nhật Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            ` : '<p>Chưa có đơn hàng nào trong hệ thống.</p>'}
        </div>
    `;
    return renderLayout('Quản lý Đơn hàng', body, user);
};

module.exports = { renderOrders, renderManageOrders };
