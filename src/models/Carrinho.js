const CarrinhoItem = require('./CarrinhoItem'); // Importa a classe CarrinhoItem

class Carrinho {
    constructor() {
        this.itens = [];
    }

    criarItem(produto, cor, tamanho, quantidade) {
        return new CarrinhoItem(produto, cor, tamanho, quantidade); // Cria um novo item de carrinho
    }

    // Função para adicionar um item ao carrinho
    adicionarItem(item) {
        this.itens.push(item);
    }

    // Função para atualizar um item no carrinho
    atualizarItem(idProduto, cor, tamanho, quantidade) {
        const item = this.itens.find(item => item.produto.idProduto === idProduto);

        if (item) {
            item.cor = cor;
            item.tamanho = tamanho;
            item.quantidade = quantidade;
        } else {
            console.log('Item não encontrado no carrinho');
        }
    }

    // Método para calcular o valor total dos itens no carrinho
    calcularTotal() {
        return this.itens.reduce((total, item) => {
            return total + item.calcularTotalItem(); // Usa o método da classe CarrinhoItem para calcular o total de cada item
        }, 0);
    }
}

module.exports = Carrinho;