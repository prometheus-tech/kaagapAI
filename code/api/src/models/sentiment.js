'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sentiment = sequelize.define('Sentiment', {
    sentiment_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    score: DataTypes.INTEGER,
    label: DataTypes.STRING
  }, {});
  Sentiment.associate = models => {
    Sentiment.belongsTo(models.Result, {
      foreignKey: 'result_id',
      targetKey: 'result_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Sentiment;
};