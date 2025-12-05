const { pedidoModel } = require('../models/pedidoModel');

const pedidoController = {

    selecionaPedidos: async (req, res) => {
        try {
            const idPedido = req.query.idPedido;
            const consulta = idPedido ? pedidoModel.selectPedidoById(idPedido) : pedidoModel.listarPedido();
            const resultado = await consulta;
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A consulta não retornou resultados' });
            }
            res.status(200).json({message: 'Consulta bem sucedida!', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({message: `Ocorreu um erro no servidor`, 
                errorMessage: error.message});
        }
    },


    criarPedido: async (req, res) => {
        try {
            const {data_pedido, distancia_km, peso_kg, id_cliente, id_tipoEntrega , id_parametro} = req.body;

            if (!data_pedido || !distancia_km || !peso_kg || !id_cliente || !id_tipoEntrega || !id_parametro) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const resultado = await pedidoModel.insertPedido(data_pedido, distancia_km, peso_kg, id_cliente, id_tipoEntrega , id_parametro);

            res.status(201).json({ message: 'Registro incluido com sucesso!', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });

        };

    },

  

    alterarPedido: async (req, res) => {
        try {
            const {idPedido} = req.params
            const {id_tipoEntrega, distancia_km, peso_kg} = req.body ;

            if (!idPedido || !id_tipoEntrega || !distancia_km || !peso_kg) {
                return res.status(400).json({
                    message: "Dados incompletos no corpo da requisição"
                });
            }
           
            const pedidoAtual = await pedidoModel.selectPedidoById(idPedido);
            if (!pedidoAtual.length) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }
      
            const result = await pedidoModel.updatePedido(idPedido,id_tipoEntrega,distancia_km,peso_kg);

            if (result.affectedRows === 1 && result.changedRows === 0) {
                return res.status(200).json({ message: 'Não há alterações a serem realizadas' });
            };

            if (result.affectedRows === 1 && result.changedRows === 1) {
                res.status(200).json({message: "Pedido atualizado com sucesso", result});
            };


        } catch (error) {
            res.status(500).json({
                message: "Erro no servidor",
                errorMessage: error.message
            });
        }
    },

    excluirPedido: async (req, res) => {
        try {
            const idPedido = Number(req.params.idPedido);

            if (!idPedido || !Number.isInteger(idPedido)) {
                return res.status(400).json({ message: 'Forneça um indentificador válido' });
            }

            const resultadoDelete = await pedidoModel.deletePedido(idPedido);
            console.log(resultadoDelete.affectedRows);

            if (resultadoDelete.affectedRows == 0) {
                return res.status(200).json({message: 'Ocorreu um erro ao excluir o item.'})
            };
    
            res.status(200).json({message: 'Item excluído com sucesso!', data: resultadoDelete});

        } catch (error) {
            console.error(error);
            res.status(500).json({message: `Ocorreu um erro no servidor`, 
                errorMessage: error.message});
        }
    }
};

module.exports = { pedidoController };