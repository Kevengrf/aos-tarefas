
const sequelize = require('../config/database');
const User = require('./User');
const Tarefa = require('./Tarefa');

// Define as associações
User.hasMany(Tarefa, { foreignKey: 'UserId', onDelete: 'CASCADE' });
Tarefa.belongsTo(User, { foreignKey: 'UserId' });

const db = {
  sequelize,
  User,
  Tarefa
};

module.exports = db;
