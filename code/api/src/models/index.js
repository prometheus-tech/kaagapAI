const dotenv = require('dotenv').config();
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME_TEST,
  process.env.DB_USERNAME_TEST,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT,
    operatorsAliases: false,
    logging: false,
    define: {
      underscored: true,
      timestamps: false
    }
  }
);

const models = {
  Practitioner: sequelize.import('./practitioner'),
  Client: sequelize.import('./client'),
  Session: sequelize.import('./session'),
  Session_Document: sequelize.import('./session_document'),
  Result: sequelize.import('./result'),
  Sentiment: sequelize.import('./sentiment'),
  Emotion: sequelize.import('./emotion'),
  Category: sequelize.import('./category'),
  Entity: sequelize.import('./entity'),
  Keyword: sequelize.import('./keyword')
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
