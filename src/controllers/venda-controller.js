const Produtos = require('../models/Produto'); // Importa a lista de produtos
const produtos = Produtos.produtos; // Obtém o array de produtos exportado do módulo
const { alocacoes } = require('../models/AlocTamanho'); // Importa as alocações de tamanho e cor
const { clientes } = require('../models/Cliente'); // Importa os clientes

class VendaController {
    constructor() {
        this.carrinhos = {}; // Usamos um objeto para armazenar os carrinhos de cada usuário
    }

    // Método para adicionar um produto ao carrinho
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
            const produto = produtos.find(p => p.idProduto === item.idProduto);
    
            // Obtém as alocações para esse produto
            const alocacaoSelecionada = produto.getAlocacoes().find(aloc => 
                aloc.cor.nome === item.corSelecionada && aloc.tamanho.nome === item.tamanhoSelecionado
            );
    
            // Se a alocação for encontrada, usa o preço da alocação
            const preco = alocacaoSelecionada ? alocacaoSelecionada.preco : produto.valorVenda;
    
            // Calcula o total do item (preço * quantidade)
            totalCompra += preco * item.quantidadeSelecionada;
    
            // Obtém as cores e tamanhos disponíveis
            const coresDisponiveis = produto.obterCores();
            const tamanhosDisponiveis = produto.obterTamanhos();
    
            return {
                ...item,
                preco,  // Atualiza o preço com o valor da alocação
                descricao: produto.descricao,
                coresDisponiveis,
                tamanhosDisponiveis,
            };
        });
    
        res.render('carrinho', { 
            carrinho: carrinhoDetalhado, 
            enderecos,
            totalCompra: totalCompra.toFixed(2) 
        });
    }
    
    
    // Método para atualizar o carrinho (como cor, tamanho ou quantidade)
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
