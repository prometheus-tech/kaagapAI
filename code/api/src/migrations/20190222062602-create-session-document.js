'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Session_Documents', {
      sd_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      file: {
        type: Sequelize.STRING
      },
      file_name: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT('long')
      },
      date_added: {
        type: Sequelize.DATEONLY
      },
      last_modified: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      session_id: {
        type: Sequelize.UUID,
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Sessions',
          key:'session_id',
          as: 'session_id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Session_Documents');
  }
};