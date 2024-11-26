const Produtos = require('../models/Produto');
const produtos = Produtos.produtos;
const { clientes } = require('../models/Cliente');
const Carrinho = require('../models/Carrinho'); // Verifique o caminho correto
const { cartoes } = require('../models/Cartao');
const Venda = require('../models/Venda');
const VendaItem = require('../models/VendaItem');
const { tiposDePagamento } = require('../models/TipoDePagamento');


class VendaController {
    constructor() {
        this.carrinhos = {}; // Usamos um objeto para armazenar os carrinhos de cada usuário
        this.vendas = []; // Lista de vendas registradas
    }

    adicionarAoCarrinho(req, res) {
        const userId = req.session.user?.idLogin;
        if (!userId) {
            return res.redirect('/'); // Se não estiver logado, redireciona para login
        }

        const { idProduto, cor, tamanho, quantidade } = req.body;
        const produto = produtos.find(p => p.getidProduto() === parseInt(idProduto));

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
        const cliente = clientes.find(c => c.getidCliente() === userId); // Obtém o cliente
        const enderecos = cliente ? cliente.getenderecos() : []; // Endereços do cliente

        // Calcula o total da compra
        const totalCompra = carrinho.calcularTotal();

        // Detalhes dos itens do carrinho
        const carrinhoDetalhado = carrinho.itens.map(item => {
            const produto = produtos.find(p => p.getidProduto() === item.produto.idProduto);
            const preco = produto.getvalorVenda(); 
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
                return; // Ignora itens inválidos e continua com os demais
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


pagamento(req, res) {
    const userId = req.session.user?.idLogin;
    if (!userId) {
        return res.redirect('/');
    }

    // Obtém o carrinho do usuário
    const carrinho = this.carrinhos[userId] || new Carrinho(); // Obtém o carrinho do usuário
    const totalCompra = carrinho.calcularTotal(); // Calcula o total usando o método calcularTotal()

    // Filtra os cartões do usuário
    const cartoesUsuario = cartoes.filter(cartao => cartao.getclienteId() === userId);

    // Obtém os endereços do usuário
    const cliente = clientes.find(cliente => cliente.getidCliente() === userId); // Supondo que você tenha uma lista de clientes
    const enderecosUsuario = cliente ? cliente.getenderecos() : []; // Obtém os endereços do cliente

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
    const userId = req.session.user?.idLogin;
    if (!userId) {
        return res.redirect('/'); // Se não estiver logado, redireciona para login
    }

    // Verifica se o carrinho do usuário existe
    const carrinho = this.carrinhos[userId];
    if (!carrinho || carrinho.itens.length === 0) {
        return res.status(400).send('Carrinho vazio. Não é possível concluir a compra.');
    }

    // Obtém o cliente e o endereço de entrega
    const cliente = clientes.find(cliente => cliente.getidCliente() === userId);
    if (!cliente) {
        return res.status(400).send('Cliente não encontrado.');
    }

    const endereco = cliente.enderecos[0]; // Usa o endereço principal (endereços[0])
    if (!endereco) {
        return res.status(400).send('Endereço de entrega não encontrado.');
    }

    // Captura o tipo de pagamento
    const tipoPagamentoSelecionado = req.body.tipoPagamento;
    if (!tipoPagamentoSelecionado) {
        return res.status(400).send('Tipo de pagamento não selecionado.');
    }

    // Busca o tipo de pagamento no array `tiposDePagamento`
    const tipoPagamento = tiposDePagamento.find(tp => tp.nome.toLowerCase() === tipoPagamentoSelecionado.toLowerCase());
    if (!tipoPagamento) {
        return res.status(400).send('Tipo de pagamento inválido.');
    }

    // Cria a venda
    const idVenda = this.vendas.length + 1; // Gera um novo ID para a venda
    const dataVenda = new Date().toISOString(); // Data atual
    const dataEntrega = new Date();
    dataEntrega.setDate(dataEntrega.getDate() + 7); // Define entrega para 7 dias após a venda

    const novaVenda = new Venda(idVenda, dataVenda, dataEntrega, cliente, endereco, tipoPagamento);

    // Adiciona os itens do carrinho à venda como VendaItem
    carrinho.itens.forEach((item, index) => {
        novaVenda.adicionarItem(
            index + 1, // ID do item na venda
            item.quantidade,
            item.produto.valorVenda,
            item.produto
        );
    });

    // Salva a venda
    this.vendas.push(novaVenda);

    // Exibe os detalhes da venda no console
    console.log('Venda Concluída:', {
        idVenda: novaVenda.idVenda,
        dataVenda: novaVenda.dataVenda,
        dataEntrega: novaVenda.dataEntrega,
        cliente: {
            idCliente: novaVenda.cliente.idCliente,
            nome: novaVenda.cliente.nome
        },
        endereco: novaVenda.endereco,
        tipoPagamento: tipoPagamento.nome,
        itens: novaVenda.itens.map(item => ({
            idVendaItem: item.idVendaItem,
            produto: item.produto.nome,
            quantidade: item.quantidade,
            preco: item.preco
        }))
    });

    // Limpa o carrinho do usuário
    this.carrinhos[userId] = new Carrinho();

    // Redireciona para a página de compra concluída
    res.redirect('/home');
}


}

module.exports = new VendaController();