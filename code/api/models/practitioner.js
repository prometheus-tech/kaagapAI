'use strict';
module.exports = (sequelize, DataTypes) => {
  const Practitioner = sequelize.define('Practitioner', {
    email: DataTypes.STRING,
    phone_no: DataTypes.CHAR,
    password: DataTypes.CHAR,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    license: DataTypes.CHAR,
    status: DataTypes.ENUM('pending','deactivated','active'),
    date_registered: DataTypes.DATE,
    last_logged: DataTypes.DATE,
    session_token: DataTypes.CHAR
  }, {});
  Practitioner.removeAttribute('id');
  Practitioner.associate = function(models) {
    // associations can be defined here
    Practitioner.hasMany(models.Client, {
      foreignKey: 'practitioner_id',
      as: 'clients'
    });
    Practitioner.hasMany(models.Practitioner_Feedback, {
      foreignKey: 'practitionerf_id',
      as: 'practitioner_feedbacks'
    });
  };
  return Practitioner;
};