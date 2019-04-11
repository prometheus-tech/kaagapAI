'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sentiments', {
      sentiment_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      score: {
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Sentiments');
  }
};