'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Practitioner_Feedbacks', {
      pf_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER,
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