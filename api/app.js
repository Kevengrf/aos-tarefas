const express = require('express');
const { sequelize } = require('./models'); // Import sequelize from models/index.js
const authRoutes = require('./routes/authRoutes');
const tarefasRoutes = require('./routes/tarefasRoutes');

// Inicializa a aplicação Express.
const app = express();

// Middleware para permitir que o Express parse o JSON do corpo das requisições.
app.use(express.json());

// Rotas da API.
app.use('/api/auth', authRoutes);
app.use('/api/tarefas', tarefasRoutes);

// Rota raiz para verificar se a API está online.
app.get('/', (req, res) => {
  res.send('API de Tarefas está funcionando!');
});

// Define a porta do servidor.
const PORT = process.env.PORT || 3000;

// Sincroniza o banco de dados e inicia o servidor.
// { force: true } recria as tabelas a cada reinicialização (apenas para desenvolvimento).
sequelize.sync({ force: true }).then(() => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  }
});

// Exporta o app para que a Vercel possa usá-lo como uma Serverless Function.
module.exports = app;
