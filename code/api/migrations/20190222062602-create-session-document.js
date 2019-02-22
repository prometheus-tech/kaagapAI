'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Session_Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file: {
        type: Sequelize.BLOB
      },
      file_name: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      date_added: {
        type: Sequelize.DATE
      },
      last_modified: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.ENUM('PDF', 'TXT', 'DOCX')
      },
      sd_session_id  : {
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Sessions',
          key:'session_id',
          as: 'sd_session_id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Session_Documents');
  }
};