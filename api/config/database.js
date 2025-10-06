
const { Sequelize } = require('sequelize');

// Inicializa o Sequelize para usar o SQLite como banco de dados.
// O arquivo do banco de dados será 'database.sqlite' na raiz do projeto.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

module.exports = sequelize;
