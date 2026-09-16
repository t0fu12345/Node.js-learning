const { renderLayout } = require('../../core/utils/layout.view');

const renderCart = (cart, user, error = null) => {
    let total = 0;
    const errorMsg = error ? `<p style="color: red; font-weight: bold;">${error}</p>` : '';
    
    const rows = cart.items.map(item => {
        const food = item.foodId;
        // Nếu món đã bị xóa khỏi DB, food sẽ là null
        if (!food) return ''; 
        
        const subtotal = food.price * item.quantity;
        total += subtotal;
        
        return `
            <tr>
                <td>${food.name}</td>
                <td>${food.price.toLocaleString()} VNĐ</td>
                <td>${item.quantity}</td>
                <td>${subtotal.toLocaleString()} VNĐ</td>
                <td>
                    <form action="/cart/items/${food._id}?_method=DELETE" method="POST" onsubmit="return confirm('Xóa khỏi giỏ hàng?');">
                        <button type="submit" class="btn btn-danger">Xóa</button>
                    </form>
                </td>
            </tr>
        `;
    }).join('');

    const body = `
        <h2>Giỏ Hàng Của Bạn</h2>
        ${errorMsg}
        <div class="card">
            ${cart.items.length > 0 ? `
                <table>
                    <thead>
                        <tr>
                            <th>Tên món</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
                <h3 style="text-align: right; color: red;">Tổng cộng: ${total.toLocaleString()} VNĐ</h3>
                
                <hr style="margin: 20px 0;">
                
                <form action="/orders" method="POST" style="text-align: right;">
                    <!-- Để test chức năng mua hàng, có thể ko cần nhập tableId -->
                    <button type="submit" class="btn btn-success" style="font-size: 18px; padding: 10px 20px;">Thanh Toán / Đặt Hàng</button>
                </form>
            ` : '<p>Giỏ hàng của bạn đang trống.</p><a href="/foods" class="btn">Tiếp tục mua sắm</a>'}
        </div>
    `;
    return renderLayout('Giỏ hàng', body, user);
};

module.exports = { renderCart };
