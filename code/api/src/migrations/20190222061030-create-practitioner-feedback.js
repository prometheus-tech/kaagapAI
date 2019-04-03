'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Practitioner_Feedbacks', {
      pf_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      feedback_file: {
        type: Sequelize.BLOB
      },
      file_name: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      date_submitted: {
        type: Sequelize.DATE
      },
      p_id: {
        type: Sequelize.UUID,
        onDelete: 'RESTRICT',
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
    return queryInterface.dropTable('Practitioner_Feedbacks');
  }
};