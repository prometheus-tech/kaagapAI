'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Emotions', {
      emotion_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      sadness: {
        type: Sequelize.INTEGER
      },
      anger: {
        type: Sequelize.INTEGER
      },
      joy: {
        type: Sequelize.INTEGER
      },
      fear: {
        type: Sequelize.INTEGER
      },
      disgust: {
        type: Sequelize.INTEGER
      },
      session_id: {
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
    return queryInterface.dropTable('Emotions');
  }
};