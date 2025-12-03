const express = require('express');
const pedidoRoutes = express.Router();
const { pedidoController } = require('../controllers/pedidoController');


pedidoRoutes.post('/pedidos', pedidoController.criarPedido);
pedidoRoutes.post('/pedidos/itens', pedidoController.criarItem);
pedidoRoutes.put('/pedidos/itens/:idItem', pedidoController.alterarItem);
pedidoRoutes.delete('/pedidos/:idPedido/itens/:idItem', pedidoController.excluirItem);

module.exports = { pedidoRoutes };