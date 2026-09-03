Express.js
    MVC và MVCS
        Model kết nối vào cơ sở dữ liệu database
        View chứa code html
        Controller nhận các yêu cầu req, logic
    Khi mà client gửi req đến server
    -> Đi qua router
    -> Middleware để check authentication
    -> Handler Functions là tầng controller
    -> Templating/Static file serving

Asynchronous and Synchronous
Ở backend 
    lập trình đồng bộ có http://localhost:3000 có tầm 300 người gửi yêu cầu -> cho vào queue
    bất đồng bộ xử lý song song
Event queue phân phối cho backend xử lý


