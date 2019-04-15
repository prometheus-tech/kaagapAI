'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Practitioners', {
      p_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone_no: {
        type: Sequelize.STRING,
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
      user_status: {
        type: Sequelize.ENUM('pending', 'deactivated', 'active'),
        allowNull: false
      },
      date_registered: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      date_deactivated: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      last_logged: {
        type: Sequelize.DATE,
        allowNull: false
      },
      verification_code: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Practitioners');
  }
};