const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '10.87.169.24',
  user: 'samurai',
  password: 'MySQL1234',
  database: 'rapido_&_seguro',
  port : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// função imediatamente invocada
(async () => {
  try {
      const connection = await pool.getConnection();
      console.log(`Conexão com o MySQL bem sucedida`);
      connection.release();
  } catch (error) {
      console.error(`Erro ao conectar com banco de dados: ${error}`)
  }
})(); // sem a abertura e fechamento de parenteses ela não funciona


module.exports = { pool };

