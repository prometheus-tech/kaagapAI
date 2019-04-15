'use strict';
module.exports = (sequelize, DataTypes) => {
  const Emotion = sequelize.define('Emotion', {
    emotion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    sadness: DataTypes.INTEGER,
    anger: DataTypes.INTEGER,
    joy: DataTypes.INTEGER,
    fear: DataTypes.INTEGER,
    disgust: DataTypes.INTEGER
  }, {});

  Emotion.associate = models => {
    Emotion.belongsTo(models.Result, {
      foreignKey: 'result_id',
      targetKey: 'result_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  
  return Emotion;
};