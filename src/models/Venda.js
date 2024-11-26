const VendaItem = require('./VendaItem'); // Certifique-se de usar o caminho correto
const { TipoDePagamento } = require('./TipoDePagamento'); // Importa a classe TipoDePagamento

class Venda {
    constructor(idVenda, dataVenda, dataEntrega, cliente, endereco, tipoDePagamento = null) {
        this.idVenda = idVenda;
        this.dataVenda = dataVenda;
        this.dataEntrega = dataEntrega;
        this.cliente = cliente; // Relacionamento com o cliente
        this.endereco = endereco; // Endereço de entrega para essa venda
        this.itens = []; // Lista de VendaItem para essa venda
        this.tipoDePagamento = tipoDePagamento; // Relacionamento com TipoDePagamento
    }

    adicionarItem(idVendaItem, quantidade, preco, produto) {
        // Cria uma nova instância de VendaItem
        const novoItem = new VendaItem(idVendaItem, quantidade, preco, produto);

        // Adiciona o novo VendaItem à lista de itens
        this.itens.push(novoItem);
    }

    definirTipoDePagamento(tipoDePagamento) {
        if (!(tipoDePagamento instanceof TipoDePagamento)) {
            throw new Error("O tipo de pagamento deve ser uma instância de TipoDePagamento");
        }
        this.tipoDePagamento = tipoDePagamento;
    }
}

module.exports = Venda;
