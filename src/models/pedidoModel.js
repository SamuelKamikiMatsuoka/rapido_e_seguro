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
            FROM pedidos pe
            JOIN clientes cli on pe.clientes_id_cliente = cli.id_cliente
            JOIN tipoentrega tp on pe.tipoEntrega_id_tipo = tp.id_tipo;`;
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
            FROM pedidos pe
            JOIN clientes cli on pe.clientes_id_cliente = cli.id_cliente
            JOIN tipoentrega tp on pe.tipoEntrega_id_tipo = tp.id_tipo
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
         // Tabela registrosCalculo tem seus valores inseridos com o acionamento da TRIGGER trg_calculo_entrega_after_insert
        return rows;
    },


    updatePedido: async (pIdPedido, pTipoEntrega, pDistancia, pPeso) => {
        const sql = `UPDATE pedidos SET tipoEntrega_id_tipo = ?, distancia_km = ?, peso_kg = ?
            WHERE id_pedido = ?;`;
        const values = [pTipoEntrega, pDistancia, pPeso, pIdPedido];
        const [rows] = await pool.query(sql, values);
        // Tabela registrosCalculo é atualizada com o acionamento da TRIGGER trg_atualiza_valor_calculo_after_update
        return rows;
    },

    deletePedido: async (pIdPedido) => {
        const sql = 'DELETE FROM pedidos WHERE id_pedido = ?;';
        const values = [pIdPedido];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    selectEntrega: async () => {
        const sql = `
            SELECT
                Pedidos_id_pedido as id_pedido, 
                cli.nome as nome_cliente,
                valor_distancia, 
                valor_peso, 
                acrescimo, 
                desconto,
                taxa_extra, 
                valor_final,
                stat.nome_status as status
            FROM registrosCalculo calc
            JOIN statusEntrega stat on calc.statusEntrega_id_status = stat.id_status
            JOIN pedidos ped on calc.pedidos_id_pedido = ped.id_pedido
            JOIN clientes cli on ped.clientes_id_cliente = cli.id_cliente;`;
        const [rows] = await pool.query(sql);
        return rows;
    },


    selectEntregaById: async (pIdPedido) => {
        const sql = `
            SELECT
                Pedidos_id_pedido as id_pedido, 
                cli.nome as nome_cliente,
                valor_distancia, 
                valor_peso, 
                acrescimo, 
                desconto,
                taxa_extra, 
                valor_final,
                stat.nome_status as status
            FROM registrosCalculo calc
            JOIN statusEntrega stat on calc.statusEntrega_id_status = stat.id_status
            JOIN pedidos ped on calc.pedidos_id_pedido = ped.id_pedido
            JOIN clientes cli on ped.clientes_id_cliente = cli.id_cliente
            WHERE Pedidos_id_pedido = ?;`;
        const values = [pIdPedido]
        const [rows] = await pool.query(sql, values);
        return rows;
    }

};

module.exports = { pedidoModel };