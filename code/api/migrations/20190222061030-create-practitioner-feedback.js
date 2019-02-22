'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Practitioner_Feedbacks', {
      feedback_id: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      practitionerf_id: {
        type: Sequelize.STRING,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        references: {
          model: 'Practitioners',
          key: 'email',
          as: 'practitionerf_id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Practitioner_Feedbacks');
  }
};