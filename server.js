const express = require('express');
const bodyParser = require('body-parser');

// Importa as rotas
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Rotas
app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/dashboard', protectedRoutes); // Rotas protegidas

// Rota inicial aberta
app.get('/', (req, res) => {
    res.send('Bem-vindo à autenticação JWT!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
