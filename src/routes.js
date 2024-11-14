const express = require('express');
const authController = require('./controllers/auth-controller');
const homeController = require('./controllers/home-controller');
const vendaController = require('./controllers/venda-controller');

const router = express.Router();

// Rota para a página de login
router.get('/', authController.index.bind(authController));

// Rota para processar o login
router.post('/auth/login', authController.login.bind(authController));

// Rota para processar o logout
router.get('/auth/logout', authController.logout.bind(authController));

// Rota para a página inicial (home) com os produtos
router.get('/home', homeController.home.bind(homeController));

// Rota para exibir o carrinho de compras
router.get('/carrinho', vendaController.verCarrinho.bind(vendaController));

// Rota para adicionar produtos ao carrinho
router.post('/adicionar-carrinho', vendaController.adicionarAoCarrinho.bind(vendaController));

// Rota para atualizar o carrinho com as seleções de cor, tamanho e quantidade
router.post('/atualizar-carrinho', vendaController.atualizarCarrinho.bind(vendaController));

// Rota para exibir a página de formas de pagamento
//router.get('/pagamento', vendaController.verPagamento.bind(vendaController));

module.exports = router;
