const express = require('express');
const pedidoRoutes = express.Router();
const { pedidoController } = require('../controllers/pedidoController');


pedidoRoutes.post('/pedidos', pedidoController.criarPedido);
pedidoRoutes.put('/pedidos', pedidoController.alterarPedido);
pedidoRoutes.delete('/pedidos', pedidoController.excluirPedido);

module.exports = { pedidoRoutes };