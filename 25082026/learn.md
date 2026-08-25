- form
    GET: key = value (ví dụ https://shopee.vn/search?keyword=macbook)
        - bảo mật -> ko bảo mật (vì thấy đc hết dữ liệu)
        - chia sẻ -> dễ chia sẻ
        - trao đổi dữ liệu giữa client & server
    POST:
        - bảo mật -> tốt
        - chia sẻ -> ko chia sẻ url tới ng khác dc
        - trao đổi dữ liệu giữa client & server
    -> xử lí dữ liệu ở backend
- cookie
    - localStorage lưu ở trình duyệt lưu ở client, client khác ko thấy, server ko thấy
    - cookie dc lưu ở client, dữ liệu kiểu key value, khác j localStorage? - có thời gian tồn tại
    client & server đều CRUD dc cookie (server mạnh hơn ofc)
- session