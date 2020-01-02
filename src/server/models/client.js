module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    c_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    gender: DataTypes.ENUM('M', 'F'),
    birthdate: DataTypes.DATEONLY,
    date_added: DataTypes.DATEONLY,
    last_opened: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('archived', 'active'),
      defaultValue: 'active'
    }
  });

  Client.associate = models => {
    Client.belongsTo(models.Practitioner, {
      foreignKey: 'p_id',
      targetKey: 'p_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Client.hasMany(models.Session, {
      foreignKey: 'c_id',
      sourceKey: 'c_id'
    });
  };

  return Client;
};
