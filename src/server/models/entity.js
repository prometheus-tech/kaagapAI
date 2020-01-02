module.exports = (sequelize, DataTypes) => {
  const Entity = sequelize.define(
    'Entity',
    {
      entity_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      type: DataTypes.STRING,
      text: DataTypes.STRING,
      relevance: DataTypes.FLOAT
    },
    {}
  );

  Entity.associate = models => {
    Entity.belongsTo(models.Result, {
      foreignKey: 'result_id',
      targetKey: 'result_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Entity;
};
