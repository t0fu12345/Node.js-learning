const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel.controller');
const roomController = require('../controllers/room.controller');

// Đặt route search trước các route có tham số :id
router.get('/search', hotelController.searchHotels);
router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);
router.get('/:hotelId/rooms', roomController.getRoomsByHotelId);
router.post('/', hotelController.createHotel);
router.put('/:id', hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;
