const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
    secret: 'seu-segredo', // Substitua por uma chave secreta segura
    resave: false,
    saveUninitialized: false,
}));

app.use(flash()); // Usando o middleware connect-flash

// Usando as rotas
app.use(routes);

app.listen(5500, () => {
    console.log('Servidor rodando na porta 5500');
});
