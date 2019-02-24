'use strict';
module.exports = (sequelize, DataTypes) => {
  const Practitioner_Feedback = sequelize.define('Practitioner_Feedback', {
    pf_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    feedback_file: DataTypes.BLOB,
    file_name: DataTypes.STRING,
    message: DataTypes.STRING,
    date_submitted: DataTypes.DATE
  }, {
    timestamps: false
  });

  Practitioner_Feedback.removeAttribute('id');
  
  Practitioner_Feedback.associate = function(models) {
    // associations can be defined here
    Practitioner_Feedback.belongsTo(models.Practitioner, {
      foreignKey: 'p_id',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  };
  return Practitioner_Feedback;
};