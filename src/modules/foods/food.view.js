const { renderLayout } = require('../../core/utils/layout.view');

const renderFoods = (foods, categories, user) => {
    const categoryOptions = categories.map(c => `<option value="${c._id}">${c.name}</option>`).join('');
    
    const foodCards = foods.map(f => `
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 5px; text-align: center; margin-bottom: 15px;">
            <h3>${f.name}</h3>
            <p style="color: gray;">${f.categoryId?.name}</p>
            <p style="font-weight: bold; color: red;">${f.price.toLocaleString()} VNĐ</p>
            <p>Trạng thái: ${f.is_available && f.stock_quantity > 0 ? '<span style="color: green;">Còn hàng</span>' : '<span style="color: red;">Hết hàng</span>'} (Kho: ${f.stock_quantity})</p>
            <a href="/foods/${f._id}" class="btn">Xem chi tiết</a>
        </div>
    `).join('');

    const body = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2>Thực Đơn Nhà Hàng</h2>
            <form action="/foods" method="GET" style="display: flex; gap: 10px;">
                <input type="text" name="search" placeholder="Tìm tên món..." style="padding: 5px;">
                <select name="category" style="padding: 5px;">
                    <option value="">Tất cả danh mục</option>
                    ${categoryOptions}
                </select>
                <button type="submit" class="btn">Lọc</button>
            </form>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">
            ${foodCards.length > 0 ? foodCards : '<p>Không tìm thấy món ăn nào.</p>'}
        </div>
    `;
    return renderLayout('Thực đơn', body, user);
};

const renderFoodDetail = (food, reviews, user) => {
    const reviewsHtml = reviews.map(r => `
        <div style="border-bottom: 1px solid #ddd; padding: 10px 0;">
            <p><b>${r.userId.username}</b> - ⭐ ${r.rating}/5</p>
            <p>${r.comment || ''}</p>
        </div>
    `).join('');

    const body = `
        <div class="card" style="max-width: 600px; margin: 20px auto;">
            <h2>${food.name}</h2>
            <p style="color: gray;">Danh mục: ${food.categoryId?.name}</p>
            <p><strong>Mô tả:</strong> ${food.description || 'Không có mô tả'}</p>
            <p style="font-size: 20px; font-weight: bold; color: red;">Giá: ${food.price.toLocaleString()} VNĐ</p>
            <p>Kho: ${food.stock_quantity}</p>
            <hr style="margin: 15px 0;">
            ${food.is_available && food.stock_quantity > 0 ? `
                <form action="/cart/items" method="POST" style="display: flex; gap: 10px; align-items: center;">
                    <input type="hidden" name="foodId" value="${food._id}">
                    <label>Số lượng:</label>
                    <input type="number" name="quantity" value="1" min="1" max="${food.stock_quantity}" style="padding: 5px; width: 60px;">
                    <button type="submit" class="btn btn-success">Thêm vào giỏ</button>
                </form>
            ` : '<p style="color: red; font-weight: bold;">Món này hiện đang hết hàng.</p>'}
            <br>
            <a href="/foods" class="btn" style="background: gray;">Quay lại</a>
        </div>
        
        <!-- Khu vực Review -->
        <div class="card" style="max-width: 600px; margin: 20px auto;">
            <h3>Đánh giá từ khách hàng</h3>
            ${reviews.length > 0 ? reviewsHtml : '<p>Chưa có đánh giá nào.</p>'}
            
            <hr style="margin: 20px 0;">
            <h4>Viết đánh giá của bạn (Chỉ dành cho khách đã mua)</h4>
            <form action="/foods/${food._id}/reviews" method="POST" style="display:flex; flex-direction: column; gap:10px;">
                <label>Đánh giá (1-5 sao):</label>
                <input type="number" name="rating" min="1" max="5" required style="padding:5px;">
                <label>Bình luận:</label>
                <textarea name="comment" rows="3" style="padding:5px;"></textarea>
                <button type="submit" class="btn btn-success">Gửi đánh giá</button>
            </form>
        </div>
    `;
    return renderLayout(food.name, body, user);
};

// Giao diện quản lý món ăn cho ADMIN
const renderAdminFoods = (foods, categories, user) => {
    const categoryOptions = categories.map(c => `<option value="${c._id}">${c.name}</option>`).join('');
    
    const rows = foods.map(f => `
        <tr>
            <td>${f.name}</td>
            <td>${f.categoryId?.name}</td>
            <td>${f.price.toLocaleString()}</td>
            <td>${f.stock_quantity}</td>
            <td>
                <form action="/admin/foods/${f._id}?_method=DELETE" method="POST" style="display:inline;" onsubmit="return confirm('Bạn có chắc muốn xóa?');">
                    <button type="submit" class="btn btn-danger" style="padding: 4px 8px;">Xóa</button>
                </form>
            </td>
        </tr>
    `).join('');

    const body = `
        <h2>Quản lý Thực đơn (ADMIN)</h2>
        <div class="card">
            <h3>Thêm món mới</h3>
            <form action="/admin/foods" method="POST" style="display: grid; gap: 10px; max-width: 400px;">
                <input type="text" name="name" placeholder="Tên món" required style="padding: 8px;">
                <select name="categoryId" required style="padding: 8px;">
                    <option value="">-- Chọn danh mục --</option>
                    ${categoryOptions}
                </select>
                <input type="number" name="price" placeholder="Giá (VNĐ)" required style="padding: 8px;">
                <input type="number" name="stock_quantity" placeholder="Số lượng kho" required style="padding: 8px;">
                <textarea name="description" placeholder="Mô tả" style="padding: 8px;"></textarea>
                <button type="submit" class="btn btn-success">Thêm món</button>
            </form>
        </div>
        <div class="card">
            <h3>Danh sách món ăn</h3>
            <table>
                <thead>
                    <tr>
                        <th>Tên món</th>
                        <th>Danh mục</th>
                        <th>Giá</th>
                        <th>Kho</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;
    return renderLayout('Quản lý Thực đơn', body, user);
};

module.exports = { renderFoods, renderFoodDetail, renderAdminFoods };
