const { pool } = require('../config/db');

const pedidoModel = {

    listarPedido: async () => {
        const sql =
            ` SELECT 
	            id_pedido,
                data_pedido,
                distancia_km,
                peso_kg,
                cli.nome as nome_cliente,
                tp.nome_tipo as tipo_entrega
            from pedidos pe
            join clientes cli on pe.clientes_id_cliente = cli.id_cliente
            join tipoentrega tp on pe.tipoEntrega_id_tipo = tp.id_tipo;`;
        const [rows] = await pool.query(sql);
        return rows;
    },

    selectPedidoById: async (pIdpedido) => {
        const sql = `
            SELECT 
	            id_pedido,
                data_pedido,
                distancia_km,
                peso_kg,
                cli.nome as nome_cliente,
                tp.nome_tipo as tipo_entrega
            from pedidos pe
            join clientes cli on pe.clientes_id_cliente = cli.id_cliente
            join tipoentrega tp on pe.tipoEntrega_id_tipo = tp.id_tipo
            WHERE id_pedido = ?;`;
        const values = [pIdpedido]
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    insertPedido: async (pData, pDistancia, pPeso, pIdCliente, pTipoEntrega, pIdParametro) => {
        const sql = `
        INSERT INTO pedidos
        (data_pedido, distancia_km, peso_kg, clientes_id_cliente, tipoEntrega_id_tipo, id_parametro)
        VALUES (?, ?, ?, ?, ?, ?);`;
        const values = [pData, pDistancia, pPeso, pIdCliente, pTipoEntrega, pIdParametro];
        const [rows] = await pool.query(sql, values);
        return rows;
    },


    updatePedido: async (pIdPedido, pTipoEntrega, pDistancia, pPeso) => {
        const sql = `UPDATE pedidos SET tipoEntrega_id_tipo = ?, distancia_km = ?, peso_kg = ?
            WHERE id_pedido = ?;`;
        const values = [pTipoEntrega, pDistancia, pPeso, pIdPedido];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deletePedido: async (pIdPedido) => {
        const sql = 'DELETE FROM pedidos WHERE id_pedido = ?;';
        const [rows] = await pool.query(sql, [pIdPedido]);
        return rows;
    },

};

module.exports = { pedidoModel };