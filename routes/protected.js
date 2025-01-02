const express = require('express');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Rota protegida
router.get('/', authenticateToken, (req, res) => {
    res.json({ message: `Bem-vindo ao dashboard, ${req.user.username}!` });
});

module.exports = router;
