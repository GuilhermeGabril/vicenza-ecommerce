class VendaItem {
    constructor(idVendaItem, quantidade, preco, produto) {
        this.idVendaItem = idVendaItem;
        this.quantidade = quantidade;
        this.preco = preco;
        this.produto = produto; 
    }
}

module.exports = VendaItem;
