/**
 * Model responsável pelas operações da tabela 'clientes'.
 * Regras:
 * - CPF não pode duplicar
 * - Email não pode duplicar
 * - Telefone não pode duplicar, mas o cliente pode ter vários telefones
 */

const { pool } = require('../config/db');

const clienteModel = {

    /**
     * Retorna um cliente pelo ID
     * @param {number} idCliente
     * @returns {Promise<object[]>}
     */
    selectClienteById: async (idCliente) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente = ?;';
        const [rows] = await pool.query(sql, [idCliente]);
        return rows;
    },

    /**
     * Insere um cliente
     * CPF e Email são únicos
     * @param {string} nome
     * @param {string} cpf
     * @param {string} email
     * @returns {Promise<object>}
     */
    insertCliente: async (nome, cpf, email) => {
        const sql = `
            INSERT INTO clientes (nome, cpf, email)
            VALUES (?, ?, ?);
        `;

        try {
            const [result] = await pool.query(sql, [nome, cpf, email]);
            return result;
        } catch (error) {
            // Tratamento de erros de duplicação
            if (error.code === "ER_DUP_ENTRY") {
                if (error.sqlMessage.includes("cpf")) {
                    throw new Error("CPF já cadastrado.");
                }
                if (error.sqlMessage.includes("email")) {
                    throw new Error("Email já cadastrado.");
                }
            }
            throw error;
        }
    },

    /**
     * Atualiza nome e email do cliente
     * @param {number} idCliente
     * @param {string} nome
     * @param {string} email
     * @returns {Promise<object>}
     */
    updateCliente: async (idCliente, nome, email) => {
        const sql = `
            UPDATE clientes
            SET nome = ?, email = ?
            WHERE id_cliente = ?;
        `;

        try {
            const [result] = await pool.query(sql, [nome, email, idCliente]);
            return result;
        } catch (error) {
            if (error.code === "ER_DUP_ENTRY" && error.sqlMessage.includes("email")) {
                throw new Error("Email já está cadastrado.");
            }
            throw error;
        }
    },

    /**
     * Deleta um cliente
     * @param {number} idCliente
     * @returns {Promise<object>}
     */
    deleteCliente: async (idCliente) => {
        const sql = `
            DELETE FROM clientes
            WHERE id_cliente = ?;
        `;
        const [result] = await pool.query(sql, [idCliente]);
        return result;
    },

    /**
     * Lista todos os clientes cadastrados
     * @returns {Promise<object[]>}
     */
    listarClientes: async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    }

};

module.exports = { clienteModel };
