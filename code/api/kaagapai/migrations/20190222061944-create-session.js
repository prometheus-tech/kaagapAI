'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Sessions', {
      session_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      session_name: {
        type: Sequelize.STRING
      },
      date_of_session: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.ENUM('archived', 'active'),
        allowNull: false
      },
      c_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Clients',
          key: 'c_id',
          as: 'c_id'
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Sessions');
  }
};