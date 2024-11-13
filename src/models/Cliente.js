const Endereco = require('./Endereco');

class Cliente {
    constructor(idCliente, nome, dataNascimento, genero, cpf, enderecos = []) {
        this.idCliente = idCliente;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.cpf = cpf;
        this.enderecos = enderecos; // Lista de endereços do cliente
    }
}

// Criando alguns clientes e associando endereços
const clientes = [
    new Cliente(1, 'João', '1990-01-01', 'Masculino', '123.456.789-00', [
        Endereco.enderecos[0], // Rua A, 123
        Endereco.enderecos[1]  // Rua B, 456
    ]),
    new Cliente(2, 'Maria', '1992-05-15', 'Feminino', '987.654.321-00', [
        Endereco.enderecos[2], // Rua C, 789
        Endereco.enderecos[3]  // Rua D, 101
    ])
];

module.exports = { Cliente, clientes };
