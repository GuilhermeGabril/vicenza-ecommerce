class Cartao {
    constructor(idCartao, numeroCartao, dataExpiracao, cvv, clienteId, tipo) {
        this.idCartao = idCartao;
        this.numeroCartao = numeroCartao;
        this.dataExpiracao = dataExpiracao;
        this.cvv = cvv;
        this.clienteId = clienteId; // Relaciona o cartão a um cliente
        this.tipo = tipo; // Tipo do cartão: "débito" ou "crédito"
    }
}

// Exemplo de criação de cartões para um cliente específico
const cartoes = [
    new Cartao(1, '1234567890123456', '12/25', '123', 1, 'crédito'),
    new Cartao(2, '6543210987654321', '10/24', '456', 1, 'débito')
];

module.exports = { Cartao, cartoes };
