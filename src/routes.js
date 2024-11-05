const express = require('express');
const authController = require('./controllers/auth-controller');

const router = express.Router();

// Rota para a página de login
router.get('/', authController.index.bind(authController));

// Rota para processar o login
router.post('/auth/login', authController.login.bind(authController));

// Rota para processar o logout
router.get('/auth/logout', authController.logout.bind(authController));

// Rota para a página inicial após login
router.get('/home', authController.home.bind(authController));

module.exports = router;
