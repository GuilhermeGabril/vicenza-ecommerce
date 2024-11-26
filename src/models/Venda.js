const VendaItem = require('./VendaItem'); // Certifique-se de usar o caminho correto

class Venda {
    constructor(idVenda, dataVenda, dataEntrega, cliente, endereco) {
        this.idVenda = idVenda;
        this.dataVenda = dataVenda;
        this.dataEntrega = dataEntrega;
        this.cliente = cliente; // Relacionamento com o cliente
        this.endereco = endereco; // Endereço de entrega para essa venda
        this.itens = []; // Lista de VendaItem para essa venda
    }

    adicionarItem(idVendaItem, quantidade, preco, produto) {
        // Cria uma nova instância de VendaItem
        const novoItem = new VendaItem(idVendaItem, quantidade, preco, produto);

        // Adiciona o novo VendaItem à lista de itens
        this.itens.push(novoItem);
    }
}

module.exports = Venda;
