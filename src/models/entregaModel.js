const { pool } = require('../config/db');

const entregaModel = {

    selectEntregaById: async (idEntrega) => {
        const sql = 'SELECT * FROM entregas WHERE id_entrega = ?;';
        const [rows] = await pool.query(sql, [idEntrega]);
        return rows;
    },

    insertEntrega: async (pIdPedido) => {

        const sql = `
            INSERT INTO entregas
            (id_pedido, valor_distancia, valor_peso, acrescimo, desconto, taxa_extra, valor_final, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const values = [pIdPedido];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    updateEntregaStatus: async (idEntrega, novoStatus) => {
        const sql = `
            UPDATE entregas
            SET status = ?
            WHERE id_entrega = ?;
        `;
        const values = [novoStatus, idEntrega];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deleteEntrega: async (idEntrega) => {
        const sql = 'DELETE FROM entregas WHERE id_entrega = ?;';
        const [rows] = await pool.query(sql, [idEntrega]);
        return rows;
    },

    listarEntregas: async () => {
        const sql = 'SELECT * FROM entregas;';
        const [rows] = await pool.query(sql);
        return rows;
    }

};

module.exports = { entregaModel };

