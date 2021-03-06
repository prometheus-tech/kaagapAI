module.exports = (sequelize, DataTypes) => {
  const Emotion = sequelize.define(
    'Emotion',
    {
      emotion_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      sadness: DataTypes.FLOAT,
      anger: DataTypes.FLOAT,
      joy: DataTypes.FLOAT,
      fear: DataTypes.FLOAT,
      disgust: DataTypes.FLOAT
    },
    {}
  );

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
