CRUD
login
register
authentication
    user module
    ko login
        home
        login
        register


cơ chế phân trang paging
vd https://gozic.vn/admin/posts?page=3
vd có 23 bài viết
mỗi trang tối đa 10 bài viết
ceil(23/10)=3
trang 1 có 10
trang 2 có 10
trang 3 có 3
quy chuẩn đặt tên là page page 1 | không có = page 0

limit offset là gì?
0 1 2 .... 22
    offset = 0 -> lấy từ vị trí 0
    limit = 10 -> lấy 10 phần tử
    -> 0 1 2 ... 9

    offset = 10 -> lấy từ vị trí 10
    limit = 10 -> lấy 10 phần tử
    -> 10 11 ... 19

    offset = (page-1) * limit


Login
    Form
        route: auth/login
        method: GET
        controller: auth/auth.controller.js
        view: auth/auth.login-view.js
    Submit
        route: auth/login
        method: POST
        controller: auth/auth.controller.js
Register
    Form
        route: auth/register
        method: GET
        controller: auth/auth.controller.js
        view: auth/auth.register-view.js
    Submit
        route: auth/register
        method: POST
        controller: auth/auth.controller.js


JWT


Bcrypt & Mã hoá Mật khẩu trong MVC
    Nguyên tắc:
        Model: KHÔNG xử lý mã hoá. Model chỉ có nhiệm vụ lưu dữ liệu trơn tuột xuống DB.
        Controller: CHỊU TRÁCH NHIỆM mã hoá (khi tạo mới) và giải mã/so sánh (khi login).
    
    Quy trình Đăng ký (Register - Create):
        1. Lấy password gốc từ req.body.
        2. Mã hoá password gốc bằng bcrypt: await bcrypt.hash(password, 10).
        3. Tạo Object data mới chứa password ĐÃ MÃ HOÁ.
        4. Gọi Model.create(data) để nhét vào MongoDB.

    Quy trình Đăng nhập (Login - Read):
        1. Gọi Model.getByUsernameOrEmail(email) để lôi User dưới DB lên (lúc này password của user là chuỗi loằng ngoằng).
        2. Dùng bcrypt để so sánh password trơn người dùng vừa gõ với cái chuỗi loằng ngoằng kia: await bcrypt.compare(inputPassword, user.password).
        3. Khớp -> Thành công (lưu Cookie). Không khớp -> Báo lỗi.
        
    Quy trình Đổi mật khẩu (Update):
        1. Lấy password mới từ form.
        2. Mã hoá password mới bằng bcrypt (giống hệt bước Đăng ký).
        3. Gọi Model.update(id, { password: hashedNewPassword }).
        ⚠️ Lưu ý cực kỳ quan trọng: Nếu cập nhật thông tin thường (ví dụ: đổi avatar, sđt) mà không đổi mật khẩu thì TUYỆT ĐỐI không được gửi trường password xuống hàm update để tránh ghi đè làm mất mật khẩu cũ.