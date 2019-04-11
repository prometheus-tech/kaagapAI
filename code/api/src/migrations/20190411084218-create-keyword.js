'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Keywords', {
      keyword_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      text: {
        type: Sequelize.STRING
      },
      relevance: {
        type: Sequelize.INTEGER
      },
      count: {
        type: Sequelize.INTEGER
      },
      result_id: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Results',
          key: 'Result_id',
          as: 'Result_id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Keywords');
  }
};