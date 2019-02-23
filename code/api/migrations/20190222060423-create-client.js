'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clients', {
      c_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      fname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('M', 'F'),
        allowNull: false
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      date_added: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      last_opened: {
        type: Sequelize.DATE,
        allowNull: false
      },
      p_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Practitioners',
          key: 'p_id',
          as: 'p_id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Clients');
  }
};