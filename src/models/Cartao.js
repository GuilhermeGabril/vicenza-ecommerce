// Cartao.js
class Cartao {
    constructor(idCartao, numeroCartao, dataExpiracao, cvv, clienteId) {
        this.idCartao = idCartao;
        this.numeroCartao = numeroCartao;
        this.dataExpiracao = dataExpiracao;
        this.cvv = cvv;
        this.clienteId = clienteId; // Relaciona o cartão a um cliente
    }
}

// Exemplo de criação de cartões para um cliente específico
const cartoes = [
    new Cartao(1, '1234567890123456', '12/25', '123', 1),
    new Cartao(2, '6543210987654321', '10/24', '456', 1)
];

module.exports = { Cartao, cartoes };
