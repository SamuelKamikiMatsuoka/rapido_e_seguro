const { pool } = require('../config/db');

const pedidoModel = {

    selectPedidoById: async (pIdPedido) => {
        const sql = 'SELECT * FROM pedidos WHERE id_pedido = ?;';
        const [rows] = await pool.query(sql, [pIdPedido]);
        return rows;
    },

 insertPedido: async (pData_pedido, pDistancia_km, pPeso_kg, pClientes_id_cliente, pTipoEntrega_id_tipo) => {
    const sql = `
        INSERT INTO pedidos
        (data_pedido, distancia_km, peso_kg, clientes_id_cliente, tipoEntrega_id_tipo)
        VALUES (?, ?, ?, ?, ?);
    `;

    const values = [pData_pedido, pDistancia_km, pPeso_kg, pClientes_id_cliente, pTipoEntrega_id_tipo];

    const [rows] = await pool.query(sql, values);
    return rows;
},



    updatePedido: async (pIdPedido, pTipoEntrega_id_tipo, pDistancia_km, pPeso_kg) => {
        const sql = `
            UPDATE pedidos
            SET tipoEntrega_id_tipo = ?, distancia_km = ?, peso_kg = ?
            WHERE id_pedido = ?;
        `;
        const values = [pTipoEntrega_id_tipo, pDistancia_km, pPeso_kg, pIdPedido];
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