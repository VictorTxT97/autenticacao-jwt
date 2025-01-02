const express = require('express');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

const router = express.Router();

// Simulação de banco de dados de usuários
const users = [
    { username: 'victor', password: '12345', refreshToken: null },
    { username: 'wesley', password: '12345n', refreshToken: null }
];

// Rota de login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Valida o usuário
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
    }

    // Gera tokens
    const accessToken = generateAccessToken(username);
    const refreshToken = generateRefreshToken(username);

    // Salva o refresh token no "banco de dados"
    user.refreshToken = refreshToken;

    res.json({
        message: 'Login bem-sucedido!',
        accessToken,
        refreshToken
    });
});

// Rota para gerar novo access token usando refresh token
router.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token não fornecido!' });
    }

    // Verifica o refresh token
    const user = users.find(u => u.refreshToken === refreshToken);
    if (!user) {
        return res.status(403).json({ message: 'Refresh token inválido!' });
    }

    // Gera novo access token
    const accessToken = generateAccessToken(user.username);
    res.json({ accessToken });
});

module.exports = router;
