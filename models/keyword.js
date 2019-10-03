'use strict';
module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define('Keyword', {
    keyword_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    text: DataTypes.STRING,
    relevance: DataTypes.FLOAT,
    count: DataTypes.INTEGER
  }, {});

  Keyword.associate = models => {
    Keyword.belongsTo(models.Result, {
      foreignKey: 'result_id',
      targetKey: 'result_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  
  return Keyword;
};