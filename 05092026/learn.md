API
    Khi req và res về 1 html/text thì ko gọi là API
    API là khi gửi yêu cầu có giao thức http(s), có method GET, POST, DELETE, PUT, có url

    Cần nhớ giao tiếp giữa client - server bằng GIAO THỨC gì = http/https (tìm hiểu thêm)
    còn PHƯƠNG THỨC là GET (lấy), POST (đẩy), DELETE (xóa), PUT (sửa) (delete và put của RESTful)
    server sẽ trả về JSON

VD Viết API để lấy danh sách người dùng
    - route: api(/v1)/users/list (quy chuẩn chung, API trả về JSON)
    - method: GET
    - response:
        [
            {
                "_id":1,
                "fullname":"TRAN VAN A",
                "email":"tranvana@gmail.com",
                "address":"Ha Noi",
                "phone_number":"123"
            },
            {
                "_id":1,
                "fullname":"TRAN VAN A",
                "email":"tranvana@gmail.com",
                "address":"Ha Noi",
                "phone_number":"123"
            }
        ]

TẠI SAO PHẢI DÙNG API trong phát triển dự án phần mềm???
    Tùy nghiệp vụ
    như vd trên nếu đơn giản chỉ cần giao diện đơn giản in ra 1 cái list ko thì dùng nodejs trả html cũng dc
    nhưng thường thì code front-end và các feature như filter thì lại cần đến data JSON từ server để in ra, làm như nào?

Tạo thử 1 module CRUD để thêm sửa xóa danh sách book
define:
    book:
        _id
        book_name
        author_name
        price

Lấy danh sách book
    route: api/books/list
    method: GET
Thêm sách vào
    route: api/books/post
    method: POST
    body {
        book_name,
        author_name,
        price
    }
Sửa sách
    route: api/books/save
    method: POST
    body {
        _id,
        book_name,
        author_name,
        price
    }
Xóa sách
    route: api/books/delete
    method: DELETE/POST
    body {
        _id (chỉ cần id là đủ để xóa)
    }