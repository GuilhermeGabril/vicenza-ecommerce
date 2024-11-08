const Produtos = require('../models/Produto'); // Importa a lista de produtos
const produtos = Produtos.produtos; // Obtém o array de produtos exportado do módulo

class VendaController {
    constructor() {
        this.carrinho = []; // Inicializa o carrinho como um array vazio
    }

    verCarrinho(req, res) {
        res.render('carrinho', { carrinho: this.carrinho });
    }

    adicionarAoCarrinho(req, res) {
        const { idProduto } = req.body;
        const produto = produtos.find(p => p.idProduto === parseInt(idProduto));

        if (produto) {
            this.carrinho.push(produto); // Adiciona o produto ao carrinho
        }
        res.redirect('/home'); // Redireciona de volta para a página inicial sem mostrar uma mensagem
    }
}

module.exports = new VendaController(); // Exporta uma instância da classe
