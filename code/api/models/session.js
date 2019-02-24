'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    session_name: DataTypes.STRING,
    date_of_session: DataTypes.DATE
  }, {
    timestamps: false
  });

  Session.removeAttribute('id');

  Session.associate = function (models) {
    // associations can be defined here
    Session.belongsTo(models.Client, {
      foreignKey: 'c_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Session.hasMany(models.Session_Document, {
      foreignKey: 'sd_id'
    });
  };
  return Session;
};