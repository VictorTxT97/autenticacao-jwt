const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/jwt');

// Middleware para autenticação
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido!' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado!' });
        }
        req.user = user; // Adiciona o usuário decodificado no request
        next();
    });
}

module.exports = { authenticateToken };
