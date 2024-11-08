class Produto {
    constructor(idProduto, nome, descricao, valorCompra, valorVenda) {
        this.idProduto = idProduto;
        this.nome = nome;
        this.descricao = descricao;
        this.valorCompra = valorCompra;
        this.valorVenda = valorVenda;
    }
}

// Declaração dos produtos
const produtos = [
    new Produto(1, 'Camiseta Branca', 'Camiseta de algodão branca', 20.00, 50.00),
    new Produto(2, 'Camiseta Preta', 'Camiseta de algodão preta', 20.00, 50.00),
    new Produto(3, 'Calça Jeans', 'Calça jeans azul', 40.00, 100.00),
    new Produto(4, 'Jaqueta', 'Jaqueta de couro sintético', 80.00, 200.00),
    new Produto(5, 'Vestido', 'Vestido de verão estampado', 35.00, 90.00),
    new Produto(6, 'Blusa de Moletom', 'Blusa de moletom cinza', 45.00, 110.00),
    new Produto(7, 'Saia', 'Saia de algodão', 25.00, 70.00),
    new Produto(8, 'Shorts', 'Shorts esportivo', 20.00, 60.00)
];

module.exports = { Produto, produtos };
