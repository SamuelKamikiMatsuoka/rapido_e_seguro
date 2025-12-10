const express = require('express');
const router = express.Router();

const { clienteRoutes } = require('./clienteRoutes');
const { pedidoRoutes } = require('./pedidoRoutes');

/**
 * Módulo centralizador de rotas da API.
 * Responsável por importar e agrupar todos os arquivos de rotas específicos (Clientes, Pedidos, etc.)
 * e exportá-los como uma única unidade para o servidor principal.
 * @module routes/index
 */

/**
 * Combina as rotas de Clientes ao router principal.
 * Todas as rotas definidas em clienteRoutes ficarão acessíveis a partir da raiz '/'.
 */
router.use('/', clienteRoutes);

/**
 * Combina as rotas de Pedidos ao router principal.
 * Todas as rotas definidas em pedidoRoutes ficarão acessíveis a partir da raiz '/'.
 */
router.use('/', pedidoRoutes);

module.exports = { router };
