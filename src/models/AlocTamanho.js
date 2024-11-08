class AlocTamanho {
    constructor(idAloc, quantidade, produto, tamanho) {
        this.idAloc = idAloc;
        this.quantidade = quantidade;
        this.produto = produto; // Relacionamento com Produto
        this.tamanho = tamanho; // Relacionamento com Tamanho
    }
}

// Criação das alocações para cada produto em tamanhos P, M, G
const alocacoes = [];
const { produtos } = require('./Produto');  // Importando os produtos
const { tamanhos } = require('./Tamanho');  // Importando os tamanhos

produtos.forEach((produto, index) => {
    alocacoes.push(new AlocTamanho(index * 3 + 1, 10, produto, tamanhos[0])); // Tamanho P
    alocacoes.push(new AlocTamanho(index * 3 + 2, 15, produto, tamanhos[1])); // Tamanho M
    alocacoes.push(new AlocTamanho(index * 3 + 3, 12, produto, tamanhos[2])); // Tamanho G
});

module.exports = { AlocTamanho, alocacoes };
