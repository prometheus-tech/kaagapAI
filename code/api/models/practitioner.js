'use strict';
module.exports = (sequelize, DataTypes) => {
  const Practitioner = sequelize.define('Practitioner', {
    p_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    email: DataTypes.STRING,
    phone_no: DataTypes.CHAR,
    password: DataTypes.CHAR,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    license: DataTypes.CHAR,
    profession: DataTypes.STRING,
    status: DataTypes.ENUM('pending','deactivated','active'),
    date_registered: DataTypes.DATEONLY,
    date_deactivated: DataTypes.DATEONLY,
    last_logged: DataTypes.DATE,
    session_token: DataTypes.CHAR
  }, {
    timestamps: false
  });

  Practitioner.removeAttribute('id');

  Practitioner.associate = function(models) {
    // associations can be defined here
    Practitioner.hasMany(models.Client, {
      foreignKey: 'c_id'
    });
    
    Practitioner.hasMany(models.Practitioner_Feedback, {
      foreignKey: 'pf_id'
    });
  };

  return Practitioner;
};