const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Practitioner = sequelize.define('practitioner', {
  timestamps: false,
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  phone_no: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  license: {
    type: Sequelize.STRING,
    allowNull: false
  },
  profession: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date_registered: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  last_logged: {
    type: Sequelize.DATE,
    allowNull: false
  },
  date_deactivated: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  session_token: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Practitioner;