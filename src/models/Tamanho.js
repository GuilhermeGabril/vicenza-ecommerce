class Tamanho {
    constructor(idTamanho, tamanho, descricao) {
        this.idTamanho = idTamanho;
        this.tamanho = tamanho;
        this.descricao = descricao;
    }
    gettamanho(){
        return this.tamanho;
    }
}

// Declaração dos tamanhos P, M, G
const tamanhos = [
    new Tamanho(1, 'P', 'Pequeno'),
    new Tamanho(2, 'M', 'Médio'),
    new Tamanho(3, 'G', 'Grande')
];

module.exports = { Tamanho, tamanhos };
