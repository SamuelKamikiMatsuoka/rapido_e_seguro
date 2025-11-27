const express = require('express');
const router = express.Router();

const { entregaRoutes } = require('./entregaRoutes');
const { pedidoRoutes } = require('./pedidoRoutes'); 
const { clienteRoutes } = require('./clienteRoutes'); 

router.use('/', entregaRoutes);
router.use('/', pedidoRoutes);
router.use('/', clienteRoutes);



module.exports = { router };
