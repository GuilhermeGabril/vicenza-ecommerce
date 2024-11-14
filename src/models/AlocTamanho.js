class AlocTamanho {
    constructor(idAloc, quantidade, cor, tamanho, preco) {
        this.idAloc = idAloc;
        this.quantidade = quantidade;
        this.cor = cor;         // Relacionamento com Cor
        this.tamanho = tamanho; // Relacionamento com Tamanho
        this.preco = preco;     // Preço específico para aquela alocação
    }

    // Método para buscar a quantidade em estoque para uma combinação de cor e tamanho
    static getQuantidadeEstoque(alocacoes, cor, tamanho) {
        const alocacao = alocacoes.find(aloc =>
            aloc.cor === cor && aloc.tamanho === tamanho
        );
        return alocacao ? alocacao.quantidade : 0; // Retorna a quantidade ou 0 se não encontrar
    }
}

module.exports = { AlocTamanho };
