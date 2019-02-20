const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_kaagapai', 'admin', 'adminkaagapai', {
  dialect: 'mysql',
  host: 'localhost',
  port: '3306'
});

module.exports = sequelize;

sequelize.authenticate()
  .then(function(err) {
    console.log('db_kaagapi connected');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
