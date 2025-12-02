/**
 * Model responsável pelas operações da tabela 'entregas'.
 * Todas as regras de cálculo são feitas pela procedure 'calcular_entrega'.
 */

const { pool } = require('../config/db');

const entregaModel = {

    /**
     * Busca entrega pelo ID da entrega
     * @param {number} idEntrega
     * @returns {Promise<object[]>}
     */
    selectEntregaById: async (idEntrega) => {
        const sql = 'SELECT * FROM entregas WHERE id_entrega = ?;';
        const [rows] = await pool.query(sql, [idEntrega]);
        return rows;
    },

    /**
     * Busca entrega pelo ID do pedido (cada pedido tem apenas uma entrega)
     * @param {number} idPedido
     * @returns {Promise<object[]>}
     */
    selectEntregaByPedido: async (idPedido) => {
        const sql = 'SELECT * FROM entregas WHERE pedidos_id_pedido = ?;';
        const [rows] = await pool.query(sql, [idPedido]);
        return rows;
    },

    /**
     * Executa a procedure que calcula automaticamente a entrega
     * para um pedido específico.
     * @param {number} idPedido
     * @returns {Promise<object>}
     */
    calcularEntrega: async (idPedido) => {
        const sql = 'CALL calcular_entrega(?);';
        const [rows] = await pool.query(sql, [idPedido]);
        return rows;
    },

    /**
     * Atualiza o status da entrega
     * @param {number} idEntrega
     * @param {string} novoStatus
     * @returns {Promise<object>}
     */
    updateEntregaStatus: async (idEntrega, novoStatus) => {
        const sql = `
            UPDATE entregas
            SET status_entrega = ?
            WHERE id_entrega = ?;
        `;
        const values = [novoStatus, idEntrega];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    /**
     * Exclui uma entrega pelo ID
     * @param {number} idEntrega
     * @returns {Promise<object>}
     */
    deleteEntrega: async (idEntrega) => {
        const sql = 'DELETE FROM entregas WHERE id_entrega = ?;';
        const [rows] = await pool.query(sql, [idEntrega]);
        return rows;
    },

    /**
     * Lista todas as entregas
     * @returns {Promise<object[]>}
     */
    listarEntregas: async () => {
        const sql = 'SELECT * FROM entregas;';
        const [rows] = await pool.query(sql);
        return rows;
    }

};

module.exports = { entregaModel };
