'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Session_Documents', {
      sd_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file: {
        type: Sequelize.STRING
      },
      file_name: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.LONGTEXT
      },
      date_added: {
        type: Sequelize.DATEONLY
      },
      last_modified: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.ENUM('PDF', 'TXT', 'DOCX')
      },
      session_id: {
        type: Sequelize.INTEGER,
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