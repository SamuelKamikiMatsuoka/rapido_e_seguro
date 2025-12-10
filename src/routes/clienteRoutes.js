const express = require('express');
const clienteRoutes = express.Router();
const { clienteController } = require('../controllers/clienteController');

/**
 * Módulo de Rotas para operações de Clientes.
 * Define os endpoints HTTP e os vincula aos métodos do controller.
 * @module routes/clienteRoutes
 */

/**
 * Rota para listar clientes ou buscar por ID via query.
 * @name GET /clientes
 * @function
 * @memberof module:routes/clienteRoutes
 * @inner
 * @see module:controllers/clienteController.listarClientes
 */
clienteRoutes.get('/clientes', clienteController.listarClientes);

/**
 * Rota para cadastrar um novo cliente completo.
 * @name POST /clientes
 * @function
 * @memberof module:routes/clienteRoutes
 * @inner
 * @see module:controllers/clienteController.insertClienteCompleto
 */
clienteRoutes.post('/clientes', clienteController.insertClienteCompleto);

/**
 * Rota para atualizar dados de um cliente existente.
 * @name PUT /clientes/:idCliente
 * @function
 * @memberof module:routes/clienteRoutes
 * @inner
 * @param {string} :idCliente - ID do cliente passado na URL.
 * @see module:controllers/clienteController.atualizarCliente
 */
clienteRoutes.put('/clientes/:idCliente', clienteController.atualizarCliente);

/**
 * Rota para excluir um cliente.
 * @name DELETE /clientes/:idCliente
 * @function
 * @memberof module:routes/clienteRoutes
 * @inner
 * @param {string} :idCliente - ID do cliente passado na URL.
 * @see module:controllers/clienteController.excluirCliente
 */
clienteRoutes.delete('/clientes/:idCliente', clienteController.excluirCliente);

module.exports = { clienteRoutes };
