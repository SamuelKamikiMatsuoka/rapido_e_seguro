const express = require('express');
const pedidoRoutes = express.Router();
const { pedidoController } = require('../controllers/pedidoController');

pedidoRoutes.get('/pedidos', pedidoController.selecionaPedidos);
pedidoRoutes.post('/pedidos', pedidoController.criarPedido);
pedidoRoutes.put('/pedidos/:idPedido',pedidoController.alterarPedido);
pedidoRoutes.delete('/pedidos/:idPedido', pedidoController.excluirPedido);

module.exports = { pedidoRoutes };