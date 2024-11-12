// ProdutoCor.js

class ProdutoCor {
    constructor(idProduto, idCor) {
        this.idProduto = idProduto;
        this.idCor = idCor;
    }
}

// Exemplo de associações entre produtos e cores
const produtoCores = [
    new ProdutoCor(1, 1), // Produto 1 com Cor Vermelho
    new ProdutoCor(1, 2), // Produto 1 com Cor Azul
    new ProdutoCor(2, 2), // Produto 2 com Cor Azul
    new ProdutoCor(2, 3)  // Produto 2 com Cor Verde
];

module.exports = { ProdutoCor, produtoCores };
