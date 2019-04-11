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
    status: DataTypes.ENUM('pending', 'deactivated', 'active'),
    date_registered: DataTypes.DATEONLY,
    date_deactivated: DataTypes.DATEONLY,
    last_logged: DataTypes.DATE,
    verification_code: DataTypes.STRING
  });

  Practitioner.removeAttribute('id');

  Practitioner.associate = models => {
    Practitioner.hasMany( models.Client, {
      foreignKey: 'p_id',
      sourceKey: 'p_id'
    });

    Practitioner.hasMany(models.Practitioner_Feedback, {
      foreignKey: 'p_id',
      sourceKey: 'p_id'
    });
  };

  return Practitioner;
};
