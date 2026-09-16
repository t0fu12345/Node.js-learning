const { renderLayout } = require('../../core/utils/layout.view');

const renderLogin = (error = null) => {
    const errorMsg = error ? `<p style="color: red; font-weight: bold;">${error}</p>` : '';
    const body = `
        <div class="card" style="max-width: 400px; margin: 40px auto; text-align: center;">
            <h2>Đăng nhập Hệ thống</h2>
            ${errorMsg}
            <form action="/login" method="POST">
                <div style="margin-bottom: 15px; text-align: left;">
                    <label>Username:</label><br>
                    <input type="text" name="username" required style="width: 100%; padding: 8px; box-sizing: border-box;">
                </div>
                <div style="margin-bottom: 15px; text-align: left;">
                    <label>Password:</label><br>
                    <input type="password" name="password" required style="width: 100%; padding: 8px; box-sizing: border-box;">
                </div>
                <button type="submit" class="btn" style="width: 100%;">Đăng nhập</button>
            </form>
            <p style="margin-top: 15px;">Chưa có tài khoản? <a href="/register">Đăng ký ngay</a></p>
        </div>
    `;
    return renderLayout('Đăng nhập', body);
};

const renderRegister = (error = null) => {
    const errorMsg = error ? `<p style="color: red; font-weight: bold;">${error}</p>` : '';
    const body = `
        <div class="card" style="max-width: 400px; margin: 40px auto; text-align: center;">
            <h2>Đăng ký Tài khoản</h2>
            ${errorMsg}
            <form action="/register" method="POST">
                <div style="margin-bottom: 15px; text-align: left;">
                    <label>Username:</label><br>
                    <input type="text" name="username" required style="width: 100%; padding: 8px; box-sizing: border-box;">
                </div>
                <div style="margin-bottom: 15px; text-align: left;">
                    <label>Password:</label><br>
                    <input type="password" name="password" required style="width: 100%; padding: 8px; box-sizing: border-box;">
                </div>
                <button type="submit" class="btn btn-success" style="width: 100%;">Đăng ký</button>
            </form>
            <p style="margin-top: 15px;">Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
        </div>
    `;
    return renderLayout('Đăng ký', body);
};

module.exports = { renderLogin, renderRegister };
