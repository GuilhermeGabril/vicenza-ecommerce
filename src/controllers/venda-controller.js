const Produtos = require('../models/Produto');
const produtos = Produtos.produtos;
const { clientes } = require('../models/Cliente');
const Carrinho = require('../models/Carrinho'); // Verifique o caminho correto
const { cartoes } = require('../models/Cartao');

class VendaController {
    constructor() {
        this.carrinhos = {}; // Usamos um objeto para armazenar os carrinhos de cada usuário
    }

    adicionarAoCarrinho(req, res) {
        const userId = req.session.user?.idLogin;
        if (!userId) {
            return res.redirect('/'); // Se não estiver logado, redireciona para login
        }

        const { idProduto, cor, tamanho, quantidade } = req.body;
        const produto = produtos.find(p => p.idProduto === parseInt(idProduto));

        if (produto) {
            // Cria ou obtém o carrinho do usuário
            const carrinho = this.carrinhos[userId] || new Carrinho();
            this.carrinhos[userId] = carrinho; // Atualiza o carrinho do usuário

            // Cria um novo item e adiciona ao carrinho
            const itemCarrinho = carrinho.criarItem(produto, cor, tamanho, 1);
            carrinho.adicionarItem(itemCarrinho);

            console.log('Carrinho Atualizado (Adição):', carrinho.itens);
        }

        res.redirect('/home');
    }

    verCarrinho(req, res) {
        const userId = req.session.user?.idLogin;
        if (!userId) {
            return res.redirect('/'); // Se não estiver logado, redireciona para login
        }

        const carrinho = this.carrinhos[userId] || new Carrinho(); // Obtém o carrinho do usuário
        const cliente = clientes.find(c => c.idCliente === userId); // Obtém o cliente
        const enderecos = cliente ? cliente.enderecos : []; // Endereços do cliente

        // Calcula o total da compra
        const totalCompra = carrinho.calcularTotal();

        // Detalhes dos itens do carrinho
        const carrinhoDetalhado = carrinho.itens.map(item => {
            const produto = produtos.find(p => p.idProduto === item.produto.idProduto);
            const preco = produto.valorVenda; // Pode ser substituído por lógica de alocação
            const coresDisponiveis = produto.obterCores();
            const tamanhosDisponiveis = produto.obterTamanhos();
        
            return {
                ...item,
                preco,
                descricao: produto.descricao,
                coresDisponiveis,
                tamanhosDisponiveis,
                corSelecionada: item.cor, // Adicionando cor selecionada
                tamanhoSelecionado: item.tamanho // Adicionando tamanho selecionado
            };
        });

        res.render('carrinho', { 
            carrinho: carrinhoDetalhado, 
            enderecos,
            totalCompra: totalCompra.toFixed(2)
        });
    }
    atualizarCarrinho(req, res) {
        const userId = req.session.user?.idLogin;
        if (!userId) {
            return res.redirect('/'); // Se não estiver logado, redireciona para login
        }
    
        const { itens } = req.body;
    
        if (!Array.isArray(itens) || itens.length === 0) {
            return res.status(400).send('Dados inválidos'); // Verifica se os itens foram enviados corretamente
        }
    
        // Obtém o carrinho do usuário ou cria um novo
        const carrinho = this.carrinhos[userId] || new Carrinho();
    
        // Itera sobre os itens e atualiza o carrinho
        itens.forEach(item => {
            const { idProduto, cor, tamanho, quantidade } = item;
    
            // Valida os dados do item
            if (!idProduto || !cor || !tamanho || !quantidade || parseInt(quantidade) <= 0) {
                console.warn(`Item inválido ignorado: ${JSON.stringify(item)}`);
                return; // Ignora itens inválidos
            }
    
            // Atualiza ou adiciona o item ao carrinho
            carrinho.atualizarItem(
                parseInt(idProduto),
                cor,
                tamanho,
                parseInt(quantidade)
            );
        });
    
        console.log('Carrinho Atualizado:', carrinho.itens);
    
        // Atualiza o carrinho do usuário
        this.carrinhos[userId] = carrinho;
    
        res.redirect('/carrinho'); // Redireciona para a página do carrinho
    }
    
    
    gerarCodigoPix() {
        // Exemplo de código PIX simples gerado aleatoriamente
        const codigoPix = Math.random().toString(36).substr(2, 10).toUpperCase();
        return codigoPix;
    }
    // Método para a página de pagamento
  // Método para gerar as parcelas do cartão
  gerarParcelas(totalCompra, numeroParcelas) {
    const parcelas = [];
    
    for (let i = 1; i <= numeroParcelas; i++) {
        const valorParcela = (totalCompra / (i)).toFixed(2);  // O valor da parcela diminui conforme o número de parcelas
        parcelas.push({
            numeroParcelas: i,
            valorParcela: valorParcela
        });
    }

    return parcelas;
}


pagamento(req, res) {
    const userId = req.session.user?.idLogin;
    if (!userId) {
        return res.redirect('/');
    }

    // Obtém o carrinho do usuário
    const carrinho = this.carrinhos[userId] || new Carrinho(); // Obtém o carrinho do usuário
    const totalCompra = carrinho.calcularTotal(); // Calcula o total usando o método calcularTotal()

    // Filtra os cartões do usuário
    const cartoesUsuario = cartoes.filter(cartao => cartao.clienteId === userId);

    // Obtém os endereços do usuário
    const cliente = clientes.find(cliente => cliente.idCliente === userId); // Supondo que você tenha uma lista de clientes
    const enderecosUsuario = cliente ? cliente.enderecos : []; // Obtém os endereços do cliente

    // Gera o código PIX
    const codigoPix = this.gerarCodigoPix();

    // Renderiza a página de pagamento
    res.render('pagamento', {
        carrinhoFinal: carrinho.itens.map(item => ({
            nomeProduto: item.produto.nome,
            cor: item.cor,
            tamanho: item.tamanho,
            quantidade: item.quantidade,
            preco: item.calcularTotalItem().toFixed(2),
            imagem: item.produto.imagem
        })),
        totalCompra: totalCompra.toFixed(2),
        codigoPix: codigoPix,
        cartoes: cartoesUsuario, // Passando os cartões do usuário
        enderecos: enderecosUsuario // Passando os endereços do usuário
    });
}

concluirCompra(req, res) {
    const metodoPagamento = req.body.metodoPagamento;
    const cartaoSelecionado = req.body.cartaoSelecionado; // ID do cartão selecionado

    if (metodoPagamento === 'cartao' && !cartaoSelecionado) {
        return res.status(400).send('Nenhum cartão selecionado.');
    }

    if (metodoPagamento === 'cartao') {
        console.log(`Cartão selecionado: ${cartaoSelecionado}`);
        // Processar pagamento com o cartão selecionado
    } else if (metodoPagamento === 'pix') {
        console.log('Pagamento por PIX');
        // Processar pagamento por PIX
    }

    // Lógica para finalizar a compra...
    res.redirect('/compra-concluida');
}

}

module.exports = new VendaController();