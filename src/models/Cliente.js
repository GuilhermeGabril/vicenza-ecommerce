class Cliente {
    constructor(idCliente, nome, dataNascimento, genero, cpf) {
        this.idCliente = idCliente;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.cpf = cpf;
    }
}

// Criando alguns clientes de exemplo
const clientes = [
    new Cliente(1, 'João', '1990-01-01', 'Masculino', '123.456.789-00'),
    new Cliente(2, 'Maria', '1992-05-15', 'Feminino', '987.654.321-00')
];

module.exports = { Cliente, clientes };
