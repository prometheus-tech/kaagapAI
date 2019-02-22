'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_name: DataTypes.STRING,
    date_of_session: DataTypes.DATE
  }, {});
  Session.associate = function (models) {
    // associations can be defined here
    Session.belongsTo(models.Client, {
      foreignKey: 'client_sid',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Session.hasMany(models.Session_Document, {
      foreignKey: 'sd_session_id',
      as: 'session_documents'
    });
  };
  return Session;
};