class TipoDePagamento {
    constructor(nome, instituicaoFinanceira) {
        this.nome = nome;
        this.instituicaoFinanceira = instituicaoFinanceira;
    }

    // Método para gerar um código PIX aleatório
    gerarCodigoPix() {
        return Math.floor(Math.random() * 1000000000);
    }

    // Método para calcular as parcelas do cartão (valor e número de parcelas)
    calcularParcelas(totalCompra) {
        const maxParcelas = 12; // Número máximo de parcelas
        const parcelas = [];
        for (let i = 1; i <= maxParcelas; i++) {
            parcelas.push({
                numeroParcelas: i,
                valorParcelado: (totalCompra / i).toFixed(2)
            });
        }
        return parcelas;
    }
}

// Exemplo de tipos de pagamento
const tiposDePagamento = [
    new TipoDePagamento("PIX", "Banco Digital"),
    new TipoDePagamento("Cartão de Crédito", "Visa")
];

// Exportando a classe e o exemplo de uso
module.exports = { TipoDePagamento, tiposDePagamento };
