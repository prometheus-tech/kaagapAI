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
  dateRegistered: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    underscored: true
  },
  lastLogged: {
    type: Sequelize.DATE,
    allowNull: false,
    underscored: true
  },
  dateDeactivated: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    underscored: true
  },
  sessionToken: {
    type: Sequelize.STRING,
    allowNull: false,
    underscored: true
  }
});

module.exports = Practitioner;