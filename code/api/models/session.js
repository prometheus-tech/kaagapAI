'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    s_id: DataTypes.INTEGER,
    session_name: DataTypes.STRING,
    date_of_session: DataTypes.DATE
  }, {});

  Session.removeAttribute('id');

  Session.associate = function (models) {
    // associations can be defined here
    Session.belongsTo(models.Client, {
      foreignKey: 'c_sid',
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