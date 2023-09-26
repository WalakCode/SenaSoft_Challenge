//Importa el modulo 'mysql 
const mysql = require('mysql') 

// Define la configuracón de la base de datos, en un objeto llamado 'dbconfig'
const dbconfig = {
    host: 'localhost',  
    user: 'root',
    password: '',
    database: 'mapa',
  };

// Crea la conexion de la base de datos MySQL utilizando la configuracion 'dbconfig'
const db = mysql.createConnection(dbconfig);

// Exporta la conexión 'db'
module.exports = db;

