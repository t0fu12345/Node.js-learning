const express = require('express');
const app = express();
const PORT = 3000;

const multer = require('multer'); //khi form có loại dữ liệu khác ngoài text/number
const upload = multer();

app.use(express.urlencoded({ extended: true })); //submit form thường, chuyển url (vd title=Nodejs&author=Nguyen+Van+A) thành object JS
app.use(express.json()); //dùng khi frontend gửi json lên server
app.use(upload.none()); //react thường dùng object FormData để gom dữ liệu rồi gửi lên server, bị mã hóa thành multipart, dòng này nhặt text nhét vào req.body và bỏ ảnh/video...

const categoryRoutes = require('./routes/category.route');
const productRoutes = require('./routes/product.route');

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`API Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`- Categories API: http://localhost:${PORT}/api/categories`);
    console.log(`- Products API: http://localhost:${PORT}/api/products`);
});