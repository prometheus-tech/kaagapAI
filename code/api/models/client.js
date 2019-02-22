'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    gender: DataTypes.ENUM('M', 'F'),
    birthdate: DataTypes.DATE,
    date_added: DataTypes.DATE,
    last_opened: DataTypes.DATE
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
    Client.belongsTo(models.Practitioner, {
      foreignKey: 'practitioner_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    
    Client.hasMany(models.Session, {
      foreignKey: 'client_sid',
      as: 'sessions'
    });
  };
  return Client;
};