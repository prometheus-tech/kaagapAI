const dotenv = require('dotenv').config();
import Sequelize from 'sequelize';

const environment = process.env.NODE_ENV || 'development';

let dbName;
let dbUsername;
let dbPassword;
let host;
let port;

switch (environment) {
  case 'production':
    dbName = process.env.DB_NAME_DEV;
    dbUsername = process.env.DB_USERNAME_DEV;
    dbPassword = process.env.DB_PASSWORD;
    host = process.env.DB_HOST_DEV;
    port = process.env.DB_PORT;
    break;
  case 'test':
    dbName = process.env.DB_NAME_TEST;
    dbUsername = process.env.DB_USERNAME_TEST;
    dbPassword = process.env.DB_PASSWORD;
    host = process.env.DB_HOST_TEST;
    port = process.env.DB_PORT;
    break;
  default:
    dbName = process.env.DB_NAME_DEV;
    dbUsername = process.env.DB_USERNAME_DEV;
    dbPassword = process.env.DB_PASSWORD;
    host = process.env.HOST_DEV;
    port = process.env.DB_PORT;
    break;
}

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  dialect: 'mysql',
  host: host,
  port: port,
  operatorsAliases: false,
  logging: false,
  define: {
    underscored: true,
    timestamps: false
  }
});

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
