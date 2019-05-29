'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session_Document = sequelize.define('Session_Document', {
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
    },
    should_analyze: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Session_Document.associate = models => {
    Session_Document.belongsTo(models.Session, {
      foreignKey: 'session_id',
      targetKey: 'session_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Session_Document;
};
