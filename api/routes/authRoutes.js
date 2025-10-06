
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para registro de um novo usuário.
// POST /api/auth/signup
router.post('/signup', authController.signup);

// Rota para login de um usuário.
// POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;
