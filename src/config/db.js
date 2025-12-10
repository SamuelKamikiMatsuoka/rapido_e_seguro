const mysql = require('mysql2/promise');

/**
 * Módulo de configuração e conexão com o banco de dados MySQL.
 * Utiliza um Pool de conexões para gerenciar múltiplas requisições simultâneas de forma eficiente.
 * @module config/db
 */

/**
 * Cria o pool de conexões com as configurações definidas.
 * @type {Object}
 * @constant
 * @property {string} host - Endereço do servidor (localhost).
 * @property {string} user - Usuário do banco.
 * @property {string} password - Senha do banco.
 * @property {string} database - Nome do banco de dados (rapido_&_seguro).
 * @property {number} connectionLimit - Limite máximo de conexões simultâneas (10).
 */

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'rapido_&_seguro',
  port : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Função imediatamente invocada para testar a conectividade com o banco ao iniciar a aplicação.
 * @async
 * @function testeConexao
 * @returns {Promise<void>} Loga no console o sucesso ou erro da conexão.
 */
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

