const { pool } = require('../config/db');

const pedidoModel = {

    selectPedidoById: async (pIdPedido) => {
        const sql = 'SELECT * FROM pedidos WHERE id_pedido = ?;';
        const [rows] = await pool.query(sql, [pIdPedido]);
        return rows;
    },

    insertPedido: async (pIdCliente) => {
        const sql = `
            INSERT INTO pedidos
            (clientes_id_cliente, data_pedido, tipoEntrega_id_tipo, distancia_km, peso_kg)
            VALUES (?, ?, ?, ?, ?);
        `;

        const values = [pIdCliente];

        const [rows] = await pool.query(sql, values);
        return rows;
    },

    updatePedido: async (pIdPedido, tipo, distancia, peso) => {
        const sql = `
            UPDATE pedidos
            SET tipo = ?, distancia = ?, peso = ?
            WHERE id_pedido = ?;
        `;
        const values = [tipo, distancia, peso, pIdPedido];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deletePedido: async (pIdPedido) => {
        const sql = 'DELETE FROM pedidos WHERE id_pedido = ?;';
        const [rows] = await pool.query(sql, [pIdPedido]);
        return rows;
    },

    listarPedidos: async () => {
        const sql = 'SELECT * FROM pedidos;';
        const [rows] = await pool.query(sql);
        return rows;
    }
};

module.exports = { pedidoModel };