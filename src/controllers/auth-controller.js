const { logins } = require('../models/Login'); // Importe logins

class AuthController {
    index(req, res) {
        res.render('login', { error: req.flash('error') });
    }

    login(req, res) {
        const { email, senha } = req.body;
        const login = logins.find(l => l.email === email && l.senha === senha);

        if (login) {
            req.session.user = login;
            res.redirect('/home');
        } else {
            req.flash('error', 'Email ou senha incorretos');
            res.redirect('/');
        }
    }

    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }

    home(req, res) {
        res.render('home');
    }
}

module.exports = new AuthController();
