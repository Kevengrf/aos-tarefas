
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o modelo 'User' para o banco de dados.
const User = sequelize.define('User', {
  // O nome de usuário, deve ser único.
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // O email, deve ser único e em formato de email válido.
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  // A senha do usuário.
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
