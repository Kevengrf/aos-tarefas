
const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT.
module.exports = (req, res, next) => {
  // Pega o token do header de autorização.
  const authHeader = req.headers.authorization;

  // Verifica se o header de autorização existe e se está no formato correto ('Bearer TOKEN').
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  // Extrai o token do header.
  const token = authHeader.split(' ')[1];

  try {
    // Verifica e decodifica o token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Adiciona o ID do usuário do payload do token ao objeto de requisição.
    req.userId = decoded.id;
    
    // Continua para a próxima função de middleware ou rota.
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};
