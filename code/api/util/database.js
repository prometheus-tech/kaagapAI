const mysql = require('mysql2');
const Sequelize = require('sequelize');
const models = require('./models');


models.sequelize.authenticate()
  .then(function(err) {
    console.log('db_kaagapi connected');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
