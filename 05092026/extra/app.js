const express = require('express');
const app = express();
const PORT = 3000;

const multer = require('multer');
const upload = multer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload.none());

const hotelRoutes = require('./routes/hotel.route');
const roomRoutes = require('./routes/room.route');
const customerRoutes = require('./routes/customer.route');

app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/customers', customerRoutes);

app.listen(PORT, () => {
    console.log(`API Server đang chạy tại: http://localhost:${PORT}`);
    console.log(`- Hotels API: http://localhost:${PORT}/api/hotels`);
    console.log(`- Rooms API: http://localhost:${PORT}/api/rooms`);
    console.log(`- Customers API: http://localhost:${PORT}/api/customers`);
});
