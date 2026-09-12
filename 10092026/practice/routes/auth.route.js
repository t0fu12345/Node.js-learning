const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/register', authController.showRegisterForm);
router.post('/register', authController.processRegister);

router.get('/login', authController.showLoginForm);
router.post('/login', authController.processLogin);

router.get('/logout', authController.showLogoutForm);
router.post('/logout', authController.processLogout);

module.exports = router;
