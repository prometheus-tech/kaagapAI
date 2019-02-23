const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database, config.username, config.password);

const models = {
  practitioner = sequelize.import('./practitioner'),
  client = sequelize.import('./client'),
  session = sequelize.import('./session'),
  session_document = sequelize.import('./session_document'),
  practitioner_feedback = sequelize.import('./practitioner_feedback'),
};

Object.keys(models).forEach((modelName) => {
  if('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;