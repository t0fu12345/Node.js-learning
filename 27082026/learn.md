1. Tạo form tìm kiếm
    - Form -> nhập gửi dữ liệu lên -> BE nhận dc dữ liệu -> logs

    Để vào 1 trang -> hiển thị ra form tìm kiếm
    route
        /search -> HTML như thế nào thì tự triển khai theo thiết kế
    method
        GET (vì là muốn gõ trên url để tìm kiếm)
    với thiết kế hiện tại
    -> submit form
        route: /search
        method: GET
2. Tạo form tìm kiếm
    - Form -> gửi dữ liệu lên -> BE nhận dữ liệu -> hiển thị ra trang chứa kết quả (vẫn trang đó)
3. Tạo form tìm kiếm
    - Form -> gửi dữ liệu lên -> BE nhận dữ liệu -> hiển thị ra trang chứa kết quả (ra trang khác)
4. Trang đăng ký
    - Form -> Nhấn gửi dữ liệu -> BE nhận và show logs

    - Làm sao để có 1 trang form đăng ký
    route: /user/register
    method: GET
    ra trang đăng ký
    route: /user/register
    method: POST
    submit form
        key là phần name trong thẻ input
        value thì nhập vào
5. Trang đăng ký
    - Form -> Nhận dữ liệu -> Hiện trang thông tin người dùng (trang khác)
6. Trang đăng ký
    - Form -> Nhận dữ liệu -> BE lưu vào cookie -> chuyển sang trang login
    - Form login -> nhập -> so sánh cookie -> khớp thì welcome sai thì báo lỗi

    6.1. Hiển thị ra form đăng ký như trên
    6.2. Xử lý dữ liệu trong form
    6.3. Lưu thông tin dữ liệu vào cookie
    

---
Phát triển 1 chức năng -> cho phép người dùng truy cập

https://gemini.google.com/u/0/app/5f726eb2d9f143c9?hl=en-IN&pageId=none
-> domain: gemini.google.com
-> base route/ base url -> https://gemini.google.com
-> route path/ route/ endpoint/ api -> u/0/app/5f726eb2d9f143c9?hl=en-IN&pageId=none
-> url: https://gemini.google.com/u/0/app/5f726eb2d9f143c9?hl=en-IN&pageId=none

