const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinema.controller');

router.get('/', cinemaController.getAllCinemas);
router.get('/:id', cinemaController.getCinemaById);

module.exports = router;
