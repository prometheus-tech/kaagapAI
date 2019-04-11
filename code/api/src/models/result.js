'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    result_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    date_generated: DataTypes.DATE
  }, {});

  Result.associate = models => {
    Result.belongsTo(models.Session, {
      foreignKey: 'session_id',
      targetKey: 'session_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  
  return Result;
};