const Produtos = require('../models/Produto'); // Importe os produtos

class HomeController {
    home(req, res) {
        const produtos = Produtos.produtos; // Obtenha a lista de produtos

        // Passa tanto o 'user' da sessão quanto os 'produtos' para a visão
        res.render('home', { user: req.session.user, produtos: produtos });
    }
}

module.exports = new HomeController();
