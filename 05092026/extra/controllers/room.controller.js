const RoomModel = require('../models/room.model');

const getAllRooms = (req, res) => {
    const data = RoomModel.getAll();

    res.json({ message: "Lấy danh sách thành công", data });
};

const getRoomById = (req, res) => {
    const id = req.params.id;
    const data = RoomModel.getById(id);

    if (data) {
        res.json({
            message: "Lấy thành công",
            data: data
        });
    } else {
        res.status(404).json({ message: "Không tìm thấy phòng" });
    }
};

const getRoomsByHotelId = (req, res) => {
    const hotelId = req.params.hotelId;
    const data = RoomModel.getByHotelId(hotelId);

    res.json({
        message: "Lấy danh sách thành công",
        data: data
    });
};

const searchRooms = (req, res) => {
    const { status, type } = req.query;
    const data = RoomModel.search({ status, type });

    res.json({
        message: "Tìm kiếm thành công",
        data: data
    });
};

const createRoom = (req, res) => {
    const { hotel_id, room_number, room_type, price, status } = req.body;
    const newRoom = RoomModel.create({ hotel_id, room_number, room_type, price, status });

    res.status(201).json({
        message: "Thêm phòng thành công",
        data: newRoom
    });
};

const updateRoom = (req, res) => {
    const id = req.params.id;
    const { hotel_id, room_number, room_type, price, status } = req.body;
    const updatedRoom = RoomModel.update(id, { hotel_id, room_number, room_type, price, status });

    if (updatedRoom) {
        res.json({
            message: "Cập nhật thành công",
            data: updatedRoom
        });
    } else {
        res.status(404).json({
            message: "Không tìm thấy phòng"
        });
    }
};

const deleteRoom = (req, res) => {
    const id = req.params.id;
    const deleted = RoomModel.delete(id);

    if (deleted) {
        res.json({ message: "Xóa thành công" });
    } else {
        res.status(404).json({ message: "Không tìm thấy phòng để xóa" });
    }
};

module.exports = {
    getAllRooms,
    getRoomById,
    getRoomsByHotelId,
    searchRooms,
    createRoom,
    updateRoom,
    deleteRoom
};
