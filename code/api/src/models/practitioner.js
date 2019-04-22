'use strict';
module.exports = (sequelize, DataTypes) => {
  const Practitioner = sequelize.define('Practitioner', {
    p_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: DataTypes.STRING,
    phone_no: DataTypes.STRING,
    password: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    license: DataTypes.STRING,
    profession: DataTypes.STRING,
    user_status: {
      type: DataTypes.ENUM('pending', 'deactivated', 'active'),
      defaultValue: 'pending'
    },
    date_registered: DataTypes.DATEONLY,
    date_deactivated: DataTypes.DATEONLY,
    last_logged: DataTypes.DATE,
    verification_code: DataTypes.STRING,
    change_password_UUID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  });

  Practitioner.removeAttribute('id');

  Practitioner.associate = models => {
    Practitioner.hasMany( models.Client, {
      foreignKey: 'p_id',
      sourceKey: 'p_id'
    });
  };

  return Practitioner;
};
