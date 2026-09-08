Kết nối cơ sở dữ liệu mongoDB với node

Tầng driver để ứng dụng kết nối với csdl
    có 2 phần
        driver manager
        drivers (vd mongoDB driver dành cho mongoDB)

vd
Tạo module: users - CRUD

users/user.model.js: _id, name, birthday, phone, address, password

1. Hiển thị list người dùng
    route: users/index
    method: GET
    controller: user/user.controller.js
    view: users/user.view-list.js
2. Thêm người dùng
Form
    route: users/add
    method: GET
    controller: users/user.controller.js
    view: users/user.view-add.js
Post
    route: users/add
    method: POST
    controller: users/user.controller.js
3. Sửa người dùng
Form
    route: users/edit/:id
    method: GET
    controller: users/user.controller.js
    view: user/user.view-edit.js
Save
    route: users/edit/:id
    method: POST
    controller: users/user.controller.js
4. Xóa người dùng
Form
    route: users/delete/:id
    method: GET
    controller: users/user.controller.js
    view: users/user.view-delete.js
Delete
    route: users/delete/:id
    method: POST
    controller: users/user.controller.js

Tạo module: home
    route:/
    controller: home/home.controller.js
    method:GET



connection string??
async await
kết nối db và query thì query trả về dataset (Cần toArray...)

thi thì thi bằng nodejs thường và kết nối db