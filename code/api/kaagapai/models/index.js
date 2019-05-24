'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dotenv = require('dotenv').config();


var sequelize = new _sequelize2.default(process.env.DB_NAME_TEST, process.env.DB_USERNAME_TEST, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST_TEST,
  port: process.env.DB_PORT,
  operatorsAliases: false,
  logging: false,
  define: {
    underscored: true,
    timestamps: false
  }
});

var models = {
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

Object.keys(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = _sequelize2.default;

exports.default = models;