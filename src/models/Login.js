class Login {
    constructor(idLogin, email, senha, idCliente) {
        this.idLogin = idLogin;
        this.email = email;
        this.senha = senha;
        this.idCliente = idCliente; // Referência ao cliente correspondente
    }
}

// Criando alguns logins de exemplo
const logins = [
    new Login(1, 'joao@example.com', 'senha123', 1),
    new Login(2, 'maria@example.com', 'senha456', 2)
];

module.exports = { Login, logins };
