// src/controllers/homeController.js
const { produtos } = require('../models/Produto');

class HomeController {
    home(req, res) {
        // Aqui estamos passando os produtos para a view "home.ejs"
        res.render('home', { produtos });
    }
}

module.exports = new HomeController();
