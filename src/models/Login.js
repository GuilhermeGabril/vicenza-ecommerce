class Login {
    constructor(idLogin, email, senha) {
        this.idLogin = idLogin;
        this.email = email;
        this.senha = senha;
    }

    getEmail() {
        return this.email;
    }

    getSenha() {
        return this.senha;
    }
}

// Criação de logins de exemplo
const logins = [
    new Login(1, 'usuario1@example.com', 'senha1'),
    new Login(2, 'usuario2@example.com', 'senha2'),
];

module.exports = { Login, logins };
