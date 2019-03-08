const Sequelize = require('sequelize');

const sequelize = new Sequelize('dbkaagapai', 'admin', 'adminkaagapai', {
  dialect: 'mysql',
  host: '35.234.9.118"',
  port: '3306',
  operatorsAliases: false,
  logging: false
});

const models = {
  Practitioner: sequelize.import('./practitioner'),
  Client: sequelize.import('./client'),
  Session: sequelize.import('./session'),
  Session_Document: sequelize.import('./session_document'),
  Practitioner_Feedback: sequelize.import('./practitioner_feedback')
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
