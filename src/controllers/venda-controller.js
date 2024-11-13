const Produtos = require('../models/Produto'); // Importa a lista de produtos
const produtos = Produtos.produtos; // Obtém o array de produtos exportado do módulo
const { alocacoes } = require('../models/AlocTamanho'); // Importa as alocações de tamanho e cor
const { clientes } = require('../models/Cliente'); // Importa os clientes
const { AlocTamanho } = require('../models/AlocTamanho');
const { TipoDePagamento, tiposDePagamento } = require('../models/TipoDePagamento'); // Importa a classe TipoDePagamento e o exemplo de uso


class VendaController {
    constructor() {
        this.carrinhos = {}; // Usamos um objeto para armazenar os carrinhos de cada usuário
    }

    verCarrinho(req, res) {
        const userId = req.session.user?.idLogin;
        if (!userId) {
            return res.redirect('/'); // Redireciona para login se o usuário não estiver logado
        }

        const carrinho = this.carrinhos[userId] || []; // Obtém o carrinho do usuário logado
        const cliente = clientes.find(c => c.idCliente === userId); // Obtém o cliente com base no ID de login
        const enderecos = cliente ? cliente.enderecos : []; // Lista de endereços do cliente

        // Calcula o total da compra e gera detalhes dos itens no carrinho
        let totalCompra = 0;
        const carrinhoDetalhado = carrinho.map(item => {
            const alocacoesProduto = alocacoes.filter(aloc => aloc.produto.idProduto === item.idProduto);

            const coresDisponiveis = [...new Set(alocacoesProduto.map(aloc => aloc.cor))];
            const tamanhosDisponiveis = [...new Set(alocacoesProduto.map(aloc => aloc.tamanho))];
            
            totalCompra += item.preco * (item.quantidadeSelecionada || 1); // Calcula o total da compra

            return {
                ...item,
                coresDisponiveis,
                tamanhosDisponiveis
            };
        });
        
        // Gera código PIX e parcelas para pagamento com cartão
        const codigoPix = tiposDePagamento[0].gerarCodigoPix();
        const parcelasCartao = tiposDePagamento[1].calcularParcelas(totalCompra);

        res.render('carrinho', { 
            carrinho: carrinhoDetalhado, 
            enderecos,
            codigoPix, 
            parcelasCartao,
            totalCompra 
        });
    }

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
            this.carrinhos[userId].push({ ...produto, quantidade: 1 }); // Inicializa quantidade em 1
        }

        res.redirect('/home'); // Redireciona de volta para a página inicial
    }

    atualizarCarrinho(req, res) {
        const userId = req.session.user?.idLogin;
        if (!userId) {
            return res.redirect('/'); // Se não estiver logado, redireciona para login
        }

        const carrinho = this.carrinhos[userId] || [];
        const { idProduto, cor, tamanho, quantidade } = req.body;

        // Encontrar o item do carrinho e atualizar
        const itemCarrinho = carrinho.find(p => p.idProduto === parseInt(idProduto));
        
        if (itemCarrinho) {
            itemCarrinho.corSelecionada = cor;
            itemCarrinho.tamanhoSelecionado = tamanho;
            itemCarrinho.quantidadeSelecionada = parseInt(quantidade);
        }

        res.redirect('/carrinho');
    }
    
}

module.exports = new VendaController();
