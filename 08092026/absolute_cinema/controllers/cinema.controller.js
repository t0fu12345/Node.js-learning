const CinemaModel = require('../models/cinema.model');

const getAllCinemas = (req, res) => {
    const data = CinemaModel.getAll();
    res.json({ message: "Lấy danh sách rạp phim thành công", data });
};

const getCinemaById = (req, res) => {
    const id = req.params.id;
    const data = CinemaModel.getById(id);
    if (data) {
        res.json({ message: "Lấy thông tin rạp phim thành công", data });
    } else {
        res.status(404).json({ message: "Không tìm thấy rạp phim" });
    }
};

module.exports = {
    getAllCinemas,
    getCinemaById
};
