const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Client = sequelize.define('client', {
  timestamps: true,
  clientId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    underscored: true
  },
  cFname: {
    type: Sequelize.STRING,
    allowNull: false,
    underscored: true
  },
  cLname: {
    type: Sequelize.STRING,
    allowNull: false,
    underscored: true
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthdate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  lastOpened: {
    type: Sequelize.DATE,
    allowNull: false
  },
  createdAt: 'date_added',
  updatedAt: false
});

module.exports = Client;