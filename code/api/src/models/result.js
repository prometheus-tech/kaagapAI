'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    result_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    date_generated: DataTypes.DATEONLY
  }, {});

  Result.associate = models => {
    Result.belongsTo(models.Session, {
      foreignKey: 'session_id',
      targetKey: 'session_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Result.hasMany(models.Sentiment, {
      foreignKey: 'result_id',
      sourceKey: 'result_id'
    });

    Result.hasMany(models.Emotion, {
      foreignKey: 'result_id',
      sourceKey: 'result_id'
    });

    Result.hasMany(models.Category, {
      foreignKey: 'result_id',
      sourceKey: 'result_id'
    });

    Result.hasMany(models.Entity, {
      foreignKey: 'result_id',
      sourceKey: 'result_id'
    });

    Result.hasMany(models.Keyword, {
      foreignKey: 'result_id',
      sourceKey: 'result_id'
    });
  };

  return Result;
};