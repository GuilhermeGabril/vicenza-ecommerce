class PagamentoController {
    exibirPagamento(req, res) {
        const carrinhoFinal = req.session.carrinhoFinal || [];
        const totalCompra = carrinhoFinal.reduce((total, item) => total + (item.preco * item.quantidade), 0);
        
        // Geração do código PIX e opções de parcelamento
        const codigoPix = this.gerarCodigoPix(); // Gera o código PIX
        const parcelas = this.gerarParcelas(totalCompra); // Gera as opções de parcelamento
        
        // Passando as variáveis para o EJS
        res.render('pagamento', { 
            carrinhoFinal, 
            totalCompra,
            codigoPix,  // A variável está sendo passada aqui
            parcelas    // Passando as parcelas
        });
    }
    
    // Função para gerar o código PIX aleatório
    gerarCodigoPix() {
        return Math.random().toString(36).substring(2, 12).toUpperCase(); // Código PIX aleatório
    }

    // Função para gerar as opções de parcelamento
    gerarParcelas(totalCompra) {
        const maxParcelas = 12;
        let parcelas = [];

        for (let i = 1; i <= maxParcelas; i++) {
            const valorParcela = (totalCompra / i).toFixed(2);
            parcelas.push({
                numeroParcelas: i,
                valorParcela: valorParcela
            });
        }

        return parcelas;
    }

    // Função para concluir a compra
    concluirCompra(req, res) {
        const { metodoPagamento, parcelas } = req.body; // Método de pagamento e número de parcelas selecionado
        const carrinhoFinal = req.session.carrinhoFinal || [];
    
        const totalCompra = carrinhoFinal.reduce((acc, item) => acc + (item.preco * item.quantidade), 0); // Calcula o total da compra
    
        if (metodoPagamento === 'pix') {
            // Gera código PIX
            const codigoPix = this.gerarCodigoPix();
            res.render('compra-concluida', { metodoPagamento, codigoPix, carrinhoFinal, totalCompra });
        } else if (metodoPagamento === 'cartao') {
            const numeroParcelas = parseInt(req.body.numeroParcelas); // Obtém o número de parcelas selecionado
    
            // Calcula o valor da parcela
            const valorParcela = (totalCompra / numeroParcelas).toFixed(2); // Calcula valor das parcelas
    
            // Cria um array com as parcelas
            const parcelasCalculadas = Array.from({ length: numeroParcelas }, (_, index) => ({
                numeroParcelas: index + 1,
                valorParcela: valorParcela,
            }));
    
            res.render('compra-concluida', { metodoPagamento, parcelas: parcelasCalculadas, carrinhoFinal, totalCompra });
        } else {
            res.redirect('/pagamento'); // Caso não tenha selecionado nenhum método
        }
    }
    
}

module.exports = new PagamentoController();
