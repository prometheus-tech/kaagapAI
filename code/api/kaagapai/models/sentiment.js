'use strict';

module.exports = function (sequelize, DataTypes) {
  var Sentiment = sequelize.define('Sentiment', {
    sentiment_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    score: DataTypes.FLOAT,
    label: DataTypes.STRING
  }, {});

  Sentiment.associate = function (models) {
    Sentiment.belongsTo(models.Result, {
      foreignKey: 'result_id',
      targetKey: 'result_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Sentiment;
};