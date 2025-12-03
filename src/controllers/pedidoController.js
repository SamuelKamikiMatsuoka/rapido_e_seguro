const { pedidoModel } = require('../models/pedidoModel');

const pedidoController = {


    criarPedido: async (req, res) => {
        console.log("REQ BODY →", req.body);

        try {
            const {
                clientes_id_cliente,
                data_pedido,
                tipoEntrega_id_tipo,
                distancia_km,
                peso_kg
            } = req.body || {};

            
            if (!clientes_id_cliente || !data_pedido || !tipoEntrega_id_tipo ||
                !distancia_km || !peso_kg) {
                return res.status(400).json({
                    message: "Dados incompletos no corpo da requisição"
                });
            }

            // 🔎 Inserção
            const result = await pedidoModel.insertPedido(
                clientes_id_cliente,
                data_pedido,
                tipoEntrega_id_tipo,
                distancia_km,
                peso_kg
            );

            res.status(201).json({
                message: "Pedido criado com sucesso",
                result
            });

        } catch (error) {
            res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

  

    alterarPedido: async (req, res) => {
        try {
            const {
                id_pedido,
                tipoEntrega_id_tipo,
                distancia_km,
                peso_kg
            } = req.body || {};


            if (!id_pedido || !tipoEntrega_id_tipo || !distancia_km || !peso_kg) {
                return res.status(400).json({
                    message: "Dados incompletos no corpo da requisição"
                });
            }

           
            const pedidoAtual = await pedidoModel.selectPedidoById(id_pedido);
            if (!pedidoAtual.length) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

      
            const result = await pedidoModel.updatePedido(
                id_pedido,
                tipoEntrega_id_tipo,
                distancia_km,
                peso_kg
            );

            res.status(200).json({
                message: "Pedido atualizado com sucesso",
                result
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error.message
            });
        }
    },

    excluirPedido: async (req, res) => {
        try {
            const { id_pedido } = req.body || {};

            if (!id_pedido) {
                return res.status(400).json({ message: "Informe o id_pedido" });
            }

            const pedidoSelecionado = await pedidoModel.selectPedidoById(id_pedido);

            if (!pedidoSelecionado.length) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            const result = await pedidoModel.deletePedido(id_pedido);

            res.status(200).json({
                message: "Pedido excluído com sucesso",
                result
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error.message
            });
        }
    }
};

module.exports = { pedidoController };
