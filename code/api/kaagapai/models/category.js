'use strict';

module.exports = function (sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    score: DataTypes.FLOAT,
    label: DataTypes.STRING
  }, {});

  Category.associate = function (models) {
    Category.belongsTo(models.Result, {
      foreignKey: 'result_id',
      targetKey: 'result_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Category;
};