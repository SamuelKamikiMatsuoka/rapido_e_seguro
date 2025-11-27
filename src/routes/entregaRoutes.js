const express = require('express');
const entregaRoutes = express.Router();
const { entregaController } = require('../controllers/entregaController');


entregaRoutes.get('/entregas', entregaController.listarEntrega);
entregaRoutes.get('/entregas/:idEntrega', entregaController.buscarEntrega);
entregaRoutes.post('/entregas', entregaController.criarEntrega);
entregaRoutes.put('/entregas/:idEntrega', entregaController.atualizarEntrega);
entregaRoutes.delete('/entregas/:idEntrega', entregaController.excluirEntrega);

module.exports = { entregaRoutes };
