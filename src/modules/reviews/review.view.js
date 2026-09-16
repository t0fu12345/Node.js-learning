const { renderLayout } = require('../../core/utils/layout.view');

const renderAdminReviews = (reviews, user) => {
    let rows = reviews.map(r => `
        <tr>
            <td>${r.foodId ? r.foodId.name : 'N/A'}</td>
            <td>${r.userId ? r.userId.username : 'N/A'}</td>
            <td>${r.rating} ⭐</td>
            <td>${r.comment || ''}</td>
            <td>${new Date(r.createdAt).toLocaleString('vi-VN')}</td>
        </tr>
    `).join('');

    if (reviews.length === 0) {
        rows = `<tr><td colspan="5" style="text-align: center;">Chưa có đánh giá nào</td></tr>`;
    }

    const body = `
        <div class="card">
            <h2>Quản lý Đánh giá (Admin)</h2>
            <table>
                <thead>
                    <tr>
                        <th>Món ăn</th>
                        <th>Người đánh giá</th>
                        <th>Đánh giá</th>
                        <th>Bình luận</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;
    return renderLayout('Quản lý Đánh giá', body, user);
};

module.exports = { renderAdminReviews };
