const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Chave secreta para assinatura do token
const SECRET_KEY = 'minha_chave_secreta';

// Middleware para processar JSON
app.use(bodyParser.json());

// Simulação de banco de dados de usuários
const users = [
    { username: 'victor', password: '12345' },
    { username: 'admin', password: 'admin' }
];

// Rota inicial aberta
app.get('/', (req, res) => {
    res.send('Bem-vindo à autenticação JWT!');
});

// Rota de login para gerar token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário existe
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
    }

    // Gera o token com expiração de 1 hora
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login bem-sucedido!', token });
});

// Middleware para validar o token JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrai o token após "Bearer"

    console.log('Token recebido:', token); // Log para depuração

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido!' });
    }

    // Valida o token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Erro na validação do token:', err); // Log detalhado do erro
            return res.status(403).json({ message: 'Token inválido!' });
        }
        req.user = user; // Adiciona o usuário decodificado no request
        next();
    });
}

// Rota protegida que requer autenticação
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Bem-vindo ao dashboard, ${req.user.username}!` });
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
