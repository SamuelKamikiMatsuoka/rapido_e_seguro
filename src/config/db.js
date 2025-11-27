
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '10.87.169.52',
  user: 'samurai',
  password: 'MySQL1234',
  database: 'rapido_&_seguro',
  port : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { pool };

