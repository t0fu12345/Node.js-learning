const HotelModel = require('../models/hotel.model');

const getAllHotels = (req, res) => {
    const data = HotelModel.getAll();

    res.json({
        message: "Lấy danh sách thành công",
        data: data
    });
};

const getHotelById = (req, res) => {
    const id = req.params.id;
    const data = HotelModel.getById(id);

    if (data) {
        res.json({
            message: "Lấy thành công",
            data: data
        });
    } else {
        res.status(404).json({ message: "Không tìm thấy khách sạn" });
    }
};

const searchHotels = (req, res) => {
    const { city } = req.query;
    const data = HotelModel.searchByCity(city);

    res.json({
        message: "Tìm kiếm thành công",
        data: data
    });
};

const createHotel = (req, res) => {
    const { name, address, city, phone, star } = req.body;
    const newHotel = HotelModel.create({ name, address, city, phone, star });

    res.status(201).json({
        message: "Thêm khách sạn thành công",
        data: newHotel
    });
};

const updateHotel = (req, res) => {
    const id = req.params.id;
    const { name, address, city, phone, star } = req.body;
    const updatedHotel = HotelModel.update(id, { name, address, city, phone, star });

    if (updatedHotel) {
        res.json({
            message: "Cập nhật thành công",
            data: updatedHotel
        });
    } else {
        res.status(404).json({ message: "Không tìm thấy khách sạn" });
    }
};

const deleteHotel = (req, res) => {
    const id = req.params.id;
    const deleted = HotelModel.delete(id);

    if (deleted) {
        res.json({ message: "Xóa thành công" });
    } else {
        res.status(404).json({ message: "Không tìm thấy khách sạn để xóa" });
    }
};

module.exports = {
    getAllHotels,
    getHotelById,
    searchHotels,
    createHotel,
    updateHotel,
    deleteHotel
};