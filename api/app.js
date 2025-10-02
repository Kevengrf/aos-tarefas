const express = require('express');
const tarefasRoutes = require('./routes/tarefasRoutes');

// Inicializa a aplicação Express.
const app = express();

// Middleware para permitir que o Express parse o JSON do corpo das requisições.
app.use(express.json());

// Define um prefixo para as rotas de tarefas.
// Todas as rotas em `tarefasRoutes` serão acessadas com /tarefas na frente.
// Ex: POST /tarefas, GET /tarefas, GET /tarefas/:objectId
app.use('/tarefas', tarefasRoutes);

// Rota raiz para verificar se a API está online.
app.get('/', (req, res) => {
  res.send('API de Tarefas está funcionando! Use /tarefas para acessar os recursos.');
});

// Define a porta do servidor. Usa a porta fornecida pela Vercel ou 3000 para desenvolvimento local.
const PORT = process.env.PORT || 3000;

// Inicia o servidor apenas se não estiver no ambiente serverless da Vercel.
// A Vercel gerencia o ciclo de vida do servidor automaticamente.
if (process.env.NODE_ENV !== 'test') { // Adicionado para facilitar testes futuros
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// Exporta o app para que a Vercel possa usá-lo como uma Serverless Function.
module.exports = app;
