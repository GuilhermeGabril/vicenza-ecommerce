const { Cor, cores } = require('./Cor');
const { Tamanho, tamanhos } = require('./Tamanho');
const { AlocTamanho } = require('./AlocTamanho'); // Importando AlocTamanho

let idCounter = 1; // Contador para gerar ids das alocações

class Produto {
    constructor(idProduto, nome, descricao, valorCompra, valorVenda, imagem) {
        this.idProduto = idProduto;
        this.nome = nome;
        this.descricao = descricao;
        this.valorCompra = valorCompra;
        this.valorVenda = valorVenda;
        this.imagem = imagem; // Caminho para a imagem do produto
        this.alocacoes = []; // Vetor de alocações para esse produto (com cor + tamanho)
    }

    // Método para adicionar uma alocação ao produto
    adicionarAlocacao(alocacao) {
        this.alocacoes.push(alocacao);
    }

    // Método para retornar as alocações de um produto
    getAlocacoes() {
        return this.alocacoes;
    }

    // Método para obter todas as cores disponíveis para este produto
    obterCores() {
        const coresDisponiveis = this.alocacoes.map(aloc => aloc.cor);
        return [...new Set(coresDisponiveis)]; // Retorna cores únicas
    }

    // Método para obter todos os tamanhos disponíveis para este produto
    obterTamanhos() {
        const tamanhosDisponiveis = this.alocacoes.map(aloc => aloc.tamanho);
        return [...new Set(tamanhosDisponiveis)]; // Retorna tamanhos únicos
    }
}
const produtos = [
    new Produto(1, 'Camiseta Branca', 'Camiseta de algodão branca', 20.00, 50.00, './img/1.png'),
    new Produto(2, 'Camiseta Preta', 'Camiseta de algodão preta', 20.00, 50.00, '/img/2.png'),
    new Produto(3, 'Calça Jeans', 'Calça jeans azul', 40.00, 100.00, '/img/3.png'),
    new Produto(4, 'Jaqueta', 'Jaqueta de couro sintético', 80.00, 200.00, '/img/4.png'),
    new Produto(5, 'Vestido', 'Vestido de verão estampado', 35.00, 90.00, '/img/5.png'),
    new Produto(6, 'Blusa de Moletom', 'Blusa de moletom cinza', 45.00, 110.00, '/img/6.png'),
    new Produto(7, 'Saia', 'Saia de algodão', 25.00, 70.00, '/img/7.png'),
    new Produto(8, 'Shorts', 'Shorts esportivo', 20.00, 60.00, '/img/8.png')
];

// Criando as alocações para cada produto
produtos[0].adicionarAlocacao(new AlocTamanho(idCounter++, 10, cores[0], tamanhos[0], 50)); // Camiseta Branca
produtos[0].adicionarAlocacao(new AlocTamanho(idCounter++, 15, cores[1], tamanhos[1], 55)); // Camiseta Branca
produtos[0].adicionarAlocacao(new AlocTamanho(idCounter++, 20, cores[2], tamanhos[2], 60)); // Camiseta Branca
produtos[0].adicionarAlocacao(new AlocTamanho(idCounter++, 20, cores[3], tamanhos[2], 60)); // Camiseta Branca

produtos[1].adicionarAlocacao(new AlocTamanho(idCounter++, 8, cores[1], tamanhos[0], 50)); // Camiseta Preta
produtos[1].adicionarAlocacao(new AlocTamanho(idCounter++, 12, cores[2], tamanhos[1], 55)); // Camiseta Preta
produtos[1].adicionarAlocacao(new AlocTamanho(idCounter++, 18, cores[0], tamanhos[2], 60)); // Camiseta Preta

produtos[2].adicionarAlocacao(new AlocTamanho(idCounter++, 10, cores[1], tamanhos[0], 90)); // Calça Jeans
produtos[2].adicionarAlocacao(new AlocTamanho(idCounter++, 15, cores[2], tamanhos[1], 95)); // Calça Jeans
produtos[2].adicionarAlocacao(new AlocTamanho(idCounter++, 20, cores[0], tamanhos[2], 100)); // Calça Jeans

produtos[3].adicionarAlocacao(new AlocTamanho(idCounter++, 5, cores[0], tamanhos[0], 180)); // Jaqueta
produtos[3].adicionarAlocacao(new AlocTamanho(idCounter++, 10, cores[1], tamanhos[1], 190)); // Jaqueta
produtos[3].adicionarAlocacao(new AlocTamanho(idCounter++, 8, cores[2], tamanhos[2], 200)); // Jaqueta

produtos[4].adicionarAlocacao(new AlocTamanho(idCounter++, 7, cores[1], tamanhos[0], 80)); // Vestido
produtos[4].adicionarAlocacao(new AlocTamanho(idCounter++, 12, cores[2], tamanhos[1], 85)); // Vestido
produtos[4].adicionarAlocacao(new AlocTamanho(idCounter++, 18, cores[0], tamanhos[2], 90)); // Vestido

produtos[5].adicionarAlocacao(new AlocTamanho(idCounter++, 10, cores[2], tamanhos[0], 100)); // Blusa de Moletom
produtos[5].adicionarAlocacao(new AlocTamanho(idCounter++, 15, cores[1], tamanhos[1], 105)); // Blusa de Moletom
produtos[5].adicionarAlocacao(new AlocTamanho(idCounter++, 20, cores[0], tamanhos[2], 110)); // Blusa de Moletom

produtos[6].adicionarAlocacao(new AlocTamanho(idCounter++, 8, cores[1], tamanhos[0], 65)); // Saia
produtos[6].adicionarAlocacao(new AlocTamanho(idCounter++, 10, cores[2], tamanhos[1], 70)); // Saia
produtos[6].adicionarAlocacao(new AlocTamanho(idCounter++, 15, cores[0], tamanhos[2], 75)); // Saia

produtos[7].adicionarAlocacao(new AlocTamanho(idCounter++, 12, cores[0], tamanhos[0], 55)); // Shorts
produtos[7].adicionarAlocacao(new AlocTamanho(idCounter++, 14, cores[1], tamanhos[1], 60)); // Shorts
produtos[7].adicionarAlocacao(new AlocTamanho(idCounter++, 18, cores[2], tamanhos[2], 65)); // Shorts

module.exports = { Produto, produtos };
