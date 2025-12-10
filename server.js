/**
 * @file Arquivo principal da API Rápido e Seguro.
 * Responsável por inicializar o servidor Express, configurar middlewares globais
 * e carregar o centralizador de rotas.
 * @version 1.0.0
 * @author Equipe Rápido e Seguro
 */
const express = require('express');
const app = express();

/**
 * Porta em que o servidor HTTP irá escutar as requisições.
 * @constant {number}
 * @default 8081
 */
const PORT = 8081;

const { router } = require('./src/routes/routes');

/**
 * Middleware integrado do Express.
 * Habilita o parseamento de requisições com payload JSON (req.body).
 */
app.use(express.json());

/**
 * Importa e utiliza o roteador centralizado.
 * Todas as rotas (Clientes, Pedidos) passarão por aqui.
 */
app.use('/', router);

/**
 * Inicia o servidor e fica escutando conexões na porta especificada.
 * Exibe uma mensagem no console quando o servidor estiver pronto.
 */
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})