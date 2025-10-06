
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Função para registrar (signup) um novo usuário.
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Criptografa a senha antes de salvar no banco de dados.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário.
    const user = await User.create({ username, email, password: hashedPassword });

    // Retorna o usuário criado (sem a senha).
    res.status(201).json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
  }
};

// Função para autenticar (login) um usuário.
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Procura o usuário pelo email.
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Compara a senha fornecida com a senha armazenada no banco.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Gera um token JWT.
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h' // O token expira em 1 hora.
    });

    // Retorna o token.
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
  }
};
