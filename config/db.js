const mysql = require('mysql') 

const dbconfig = {
    host: 'localhost',  
    user: 'root',
    password: '',
    database: 'mapa',
  };

const db = mysql.createConnection(dbconfig);

module.exports = db;

