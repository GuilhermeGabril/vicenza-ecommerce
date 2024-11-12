const { logins } = require('../models/Login'); // Importa logins

class AuthController {
    index(req, res) {
        res.render('login', { error: req.flash('error') });
    }

    login(req, res) {
        const { email, senha } = req.body;
        const login = logins.find(l => l.getEmail() === email && l.getSenha() === senha);

        if (login) {
            req.session.user = login; // Armazena a instância do usuário logado na sessão
            res.redirect('/home'); // Redireciona para a página de produtos
        } else {
            req.flash('error', 'Email ou senha incorretos');
            res.redirect('/'); // Redireciona de volta para a página de login
        }
    }

    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/'); // Redireciona para a página inicial após logout
        });
    }

    home(req, res) {
        res.render('home'); // Renderiza a página de produtos
    }
}

module.exports = new AuthController();
