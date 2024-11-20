// Classe CarrinhoItem (supondo que a classe esteja em CarrinhoItem.js)
class CarrinhoItem {
    constructor(produto, cor, tamanho, quantidade) {
        this.produto = produto;
        this.cor = cor;
        this.tamanho = tamanho;
        this.quantidade = quantidade;
    }

    // Método para calcular o total de um item (preço unitário * quantidade)
    calcularTotalItem() {
        return this.produto.valorVenda * this.quantidade;
    }
}

module.exports = CarrinhoItem;
