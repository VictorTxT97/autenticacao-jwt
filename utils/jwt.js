const jwt = require('jsonwebtoken');

const SECRET_KEY = 'minha_chave_secreta';
const REFRESH_SECRET_KEY = 'minha_chave_refresh';

// Gera um token de acesso
function generateAccessToken(username) {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
}

// Gera um refresh token
function generateRefreshToken(username) {
    return jwt.sign({ username }, REFRESH_SECRET_KEY);
}

module.exports = {
    SECRET_KEY,
    generateAccessToken,
    generateRefreshToken
};
