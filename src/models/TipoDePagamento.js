class TipoDePagamento {
    constructor(nome, instituicaoFinanceira) {
        this.nome = nome;
        this.instituicaoFinanceira = instituicaoFinanceira;
    }
}

// Exemplo de tipos de pagamento
const tiposDePagamento = [
    new TipoDePagamento("PIX", "Banco Digital"),
    new TipoDePagamento("Crédito", "Visa"),
    new TipoDePagamento("Débito", "Visa")
];

// Exportando a classe e o exemplo de uso
module.exports = {TipoDePagamento, tiposDePagamento};
