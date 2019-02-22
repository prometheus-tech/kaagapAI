'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Practitioners', {
      email: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      phone_no: {
        type: Sequelize.CHAR
      },
      password: {
        type: Sequelize.CHAR
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      license: {
        type: Sequelize.CHAR
      },
      status: {
        type: Sequelize.ENUM('pending', 'deactivated', 'active')
      },
      date_registered: {
        type: Sequelize.DATE
      },
      last_logged: {
        type: Sequelize.DATE
      },
      session_token: {
        type: Sequelize.CHAR
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Practitioners');
  }
};