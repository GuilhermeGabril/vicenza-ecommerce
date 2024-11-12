const Produtos = require('../models/Produto'); // Importa a lista de produtos
const produtos = Produtos.produtos; // Obtém o array de produtos exportado do módulo

class VendaController {
    constructor() {
        this.carrinhos = {}; // Usamos um objeto para armazenar os carrinhos de cada usuário
    }

    // Rende a página do carrinho para o usuário logado
    verCarrinho(req, res) {
        const userId = req.session.user?.idLogin; // Pegue o ID de login do usuário logado (a partir da sessão)
        if (!userId) {
            return res.redirect('/'); // Se o usuário não estiver logado, redireciona para a página de login
        }

        const carrinho = this.carrinhos[userId] || []; // Se o usuário não tiver carrinho, cria um array vazio
        res.render('carrinho', { carrinho });
    }

    // Adiciona um produto ao carrinho do usuário logado
    adicionarAoCarrinho(req, res) {
        const userId = req.session.user?.idLogin; // Pegue o ID de login do usuário logado
        if (!userId) {
            return res.redirect('/'); // Se não estiver logado, redireciona para login
        }

        const { idProduto } = req.body; // Pegue o ID do produto que está sendo adicionado ao carrinho
        const produto = produtos.find(p => p.idProduto === parseInt(idProduto));

        if (produto) {
            // Se o usuário ainda não tem um carrinho, cria um
            if (!this.carrinhos[userId]) {
                this.carrinhos[userId] = [];
            }
            // Adiciona o produto ao carrinho do usuário logado
            this.carrinhos[userId].push(produto);
        }

        res.redirect('/home'); // Redireciona de volta para a página inicial
    }
}

module.exports = new VendaController();
