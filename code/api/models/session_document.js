'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session_Document = sequelize.define('Session_Document', {
    sd_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    file: DataTypes.BLOB,
    file_name: DataTypes.STRING,
    content: DataTypes.TEXT,
    date_added: DataTypes.DATE,
    last_modified: DataTypes.DATE,
    type: DataTypes.ENUM('PDF', 'TXT', 'DOCX')
  }, {});

  Session_Document.removeAttribute('id');

  Session_Document.associate = function(models) {
    // associations can be defined here
    Session_Document.belongsTo(models.Session, {
      foreignKey: 'session_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  };
  return Session_Document;
};