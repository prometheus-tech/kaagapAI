const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  //host: '',
  user: 'admin',
  password: 'adminkaagapai',
  database: 'db_kaagapai'
});

pool.getConnection((err, connection) => {
  if (err) {
    return console.error('error: ' + err.message);
  }

  if (connection) {
    connection.release();
    console.log('db_kaagapai connected');
  }
  return;
});

module.exports = pool.promise();
