'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
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
        type: Sequelize.DATE,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('archived', 'active'),
        allowNull: false
      },
      session_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Sessions',
          key: 'session_id',
          as: 'session_id'
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Session_Documents');
  }
};