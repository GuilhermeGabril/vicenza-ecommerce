class Venda {
    constructor(idVenda, dataVenda, dataEntrega, cliente) {
        this.idVenda = idVenda;
        this.dataVenda = dataVenda;
        this.dataEntrega = dataEntrega;
        this.cliente = cliente; // Relacionamento com o cliente
        this.itens = []; // Lista de VendaItem para essa venda
    }

    adicionarItem(vendaItem) {
        this.itens.push(vendaItem);
    }
}

module.exports = Venda;
