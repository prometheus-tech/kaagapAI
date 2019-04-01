'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    session_name: DataTypes.STRING,
    date_of_session: DataTypes.DATE
  });

  Session.associate = models => {
    Session.belongsTo(models.Client, {
      foreignKey: 'c_id',
      targetKey: 'c_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Session.hasMany(models.Session_Document, {
      foreignKey: 'session_id',
      sourceKey: 'session_id'
    });
  };

  return Session;
};
