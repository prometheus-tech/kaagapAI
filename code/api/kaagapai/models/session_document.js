'use strict';

module.exports = function (sequelize, DataTypes) {
  var Session_Document = sequelize.define('Session_Document', {
    sd_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    file: DataTypes.STRING,
    file_name: DataTypes.STRING,
    content: DataTypes.TEXT('long'),
    date_added: DataTypes.DATE,
    last_modified: DataTypes.DATE,
    type: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('archived', 'active'),
      defaultValue: 'active'
    }
  });

  Session_Document.associate = function (models) {
    Session_Document.belongsTo(models.Session, {
      foreignKey: 'session_id',
      targetKey: 'session_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Session_Document;
};