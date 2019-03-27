'use strict';
module.exports = (sequelize, DataTypes) => {
  const Practitioner_Feedback = sequelize.define('Practitioner_Feedback', {
    pf_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    feedback_file: DataTypes.BLOB,
    file_name: DataTypes.STRING,
    message: DataTypes.STRING,
    date_submitted: DataTypes.DATE
  });

  Practitioner_Feedback.associate = models => {
    Practitioner_Feedback.belongsTo(models.Practitioner, {
      foreignKey: 'p_id',
      targetKey: 'p_id',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  };

  return Practitioner_Feedback;
};
