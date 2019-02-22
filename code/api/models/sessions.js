'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
    s_id: DataTypes.INTEGER,
    session_name: DataTypes.STRING,
    date_of_session: DataTypes.DATE
  }, {});

  Sessions.removeAttribute('id');

  Sessions.associate = function (models) {
    // associations can be defined here
    Sessions.belongsTo(models.Client, {
      foreignKey: 'c_sid',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Sessions.hasMany(models.Session_Document, {
      foreignKey: 'sd_session_id',
      as: 'session_documents'
    });
  };
  return Sessions;
};