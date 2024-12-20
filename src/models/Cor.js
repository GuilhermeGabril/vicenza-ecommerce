// Cor.js

class Cor {
    constructor(idCor, nomeCor, hexadecimal) {
        this.idCor = idCor;
        this.nomeCor = nomeCor;
        this.hexadecimal = hexadecimal;
    }
    getnomeCor(){
        return this.nomeCor;
    }
}

// Exemplo de cores
const cores = [
    new Cor(1, 'Vermelho', '#FF0000'),
    new Cor(2, 'Azul', '#0000FF'),
    new Cor(3, 'Verde', '#00FF00'),
    new Cor(3, 'Rosa', '#00FF12')
];

module.exports = { Cor, cores };
