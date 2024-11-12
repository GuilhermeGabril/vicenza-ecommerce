function adicionarAoCarrinho(idProduto) {
    fetch('/adicionar-carrinho', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idProduto })
    })
    .then(response => response.json())
    .then(data => {
        // Não recarregue a página, apenas informe o sucesso ou erro
        alert("Produto adicionado ao carrinho!");
    })
    .catch(error => {
        console.error("Erro ao adicionar produto:", error);
    });
}
