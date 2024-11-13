class Endereco {
    constructor(idEndereco, rua, numero, bairro, cep) {
        this.idEndereco = idEndereco;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cep = cep;
    }
}

// Criando endereços fictícios
const enderecos = [
    new Endereco(1, 'Rua A', 123, 'Centro', '12345-678'),
    new Endereco(2, 'Rua B', 456, 'Jardim', '23456-789'),
    new Endereco(3, 'Rua C', 789, 'Vila Nova', '34567-890'),
    new Endereco(4, 'Rua D', 101, 'Bela Vista', '45678-901')
];

module.exports = { Endereco, enderecos };
