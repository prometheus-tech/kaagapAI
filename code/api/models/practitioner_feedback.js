'use strict';
module.exports = (sequelize, DataTypes) => {
  const Practitioner_Feedback = sequelize.define('Practitioner_Feedback', {
    feedback_file: DataTypes.BLOB,
    file_name: DataTypes.STRING,
    message: DataTypes.STRING,
    date_submitted: DataTypes.DATE
  }, {});
  
  Practitioner_Feedback.associate = function(models) {
    // associations can be defined here
    Client.belongsTo(models.Practitioner, {
      foreignKey: 'practitionerf_id',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  };
  return Practitioner_Feedback;
};