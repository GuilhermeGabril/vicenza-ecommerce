class Venda {
    constructor(idVenda, dataVenda, dataEntrega, cliente, endereco) {
        this.idVenda = idVenda;
        this.dataVenda = dataVenda;
        this.dataEntrega = dataEntrega;
        this.cliente = cliente; // Relacionamento com o cliente
        this.endereco = endereco; // Endereço de entrega para essa venda
        this.itens = []; // Lista de VendaItem para essa venda
    }

    adicionarItem(vendaItem) {
        this.itens.push(vendaItem);
    }
}

module.exports = Venda;
