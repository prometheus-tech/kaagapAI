'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Entities', {
      entity_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      type: {
        type: Sequelize.STRING
      },
      subtype: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      relevance: {
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
    return queryInterface.dropTable('Entities');
  }
};