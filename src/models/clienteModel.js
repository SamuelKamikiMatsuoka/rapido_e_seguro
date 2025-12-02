const { pool } = require('../config/db');

const clienteModel = {

    selectClienteById: async (pIdCliente) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente = ?;';
        const [rows] = await pool.query(sql, [pIdCliente]);
        return rows;
    },

    insertCliente: async (nome, cpf, email) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const sql = `
                INSERT INTO clientes (nome, cpf, email)
                VALUES (?, ?, ?);
            `;
            const values = [nome, cpf, email];

            const [result] = await connection.query(sql, values);

            await connection.commit();
            return result;

        } catch (error) {
            await connection.rollback();
            throw error;
        }
    },

    updateCliente: async (pIdCliente, nome, email) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const sql = `
                UPDATE clientes
                SET nome = ?, email = ?
                WHERE id_cliente = ?;
            `;
            const values = [nome, email, pIdCliente];

            const [result] = await connection.query(sql, values);

            await connection.commit();
            return result;

        } catch (error) {
            await connection.rollback();
            throw error;
        }
    },

    deleteCliente: async (pIdCliente) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const sql = `
                DELETE FROM clientes
                WHERE id_cliente = ?;
            `;

            const [result] = await connection.query(sql, [pIdCliente]);

            await connection.commit();
            return result;

        } catch (error) {
            await connection.rollback();
            throw error;
        }
    },

    listarClientes: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    }

};

module.exports = { clienteModel };
