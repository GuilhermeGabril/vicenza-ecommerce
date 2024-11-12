
const { produtos } = require('./Produto'); // Importando os produtos
const { tamanhos } = require('./Tamanho'); // Importando os tamanhos
const { cores } = require('./Cor'); // Importando as cores

class AlocTamanho {
    constructor(idAloc, quantidade, produto, tamanho, cor) {
        this.idAloc = idAloc;
        this.quantidade = quantidade;
        this.produto = produto; // Relacionamento com Produto
        this.tamanho = tamanho; // Relacionamento com Tamanho
        this.cor = cor; // Relacionamento com Cor
    }
}

// Criação das alocações para cada produto em tamanhos e cores
const alocacoes = [];
let idCounter = 1;

produtos.forEach(produto => {
    tamanhos.forEach(tamanho => {
        cores.forEach(cor => {
            alocacoes.push(new AlocTamanho(idCounter++, 10, produto, tamanho, cor)); // Quantidade de exemplo: 10
        });
    });
});

module.exports = { AlocTamanho, alocacoes };
