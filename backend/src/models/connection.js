const mysql = require('mysql2/promise');

const createConnection = () => mysql.createPool({
    host: process.env.MYSQL_HOSTNAME || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: 'root',
    password: 'password',
    database: 'StoreManager',
  });

module.exports = createConnection();
