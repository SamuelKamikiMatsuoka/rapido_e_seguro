const { pedidoModel } = require('../models/pedidoModel');

const pedidoController = {

    criarPedido: async (req, res) => {
        try {
            const { id_cliente, valor_total, data_pedido, id_produto, quantidade, valor_item } = req.body;

            if (!id_cliente || !valor_total || !data_pedido || !id_produto || !quantidade || !valor_item) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const resultado = await pedidoModel.insertPedido(id_cliente, valor_total, data_pedido, id_produto, quantidade, valor_item);

            res.status(201).json({ message: 'Registro incluido com sucesso!', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });

        };

    },

    criarItem: async (req, res) => {
        try {
            const { id_pedido, id_produto, quantidade, valor_item } = req.body;

            if (!id_pedido || !id_produto || !quantidade || !valor_item) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const resultado = await pedidoModel.insertItem(id_pedido, id_produto, quantidade, valor_item);

            res.status(201).json({ message: 'Registro incluido com sucesso!', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });

        };

    },

    alterarItem: async (req, res) => {
        try {
            const idItem = Number(req.params.idItem);
            const { quantidade } = req.body;

            if (!idItem || !quantidade || quantidade <= 0) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }
            const itemAtual = await pedidoModel.selectItemById(idItem);
            if (itemAtual.length === 0) {
                return res.status(404).json({ message: 'Item não encontrado' });
            }
            const resultUpdate = await pedidoModel.updateQtdItem(idItem, quantidade);

            if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 0) {
                return res.status(200).json({ message: 'Nenhum dado foi alterado' });
            };

            if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 1) {
                return res.status(200).json({ message: 'Registro alterado com sucesso!' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });

        }
    },

    excluirItem: async (req, res) => {
        try {
            const idPedido = Number(req.params.idPedido);
            const idItem = Number(req.params.idItem);

            if (!idPedido || !Number.isInteger(idPedido) || !idItem || !Number.isInteger(idItem)) {
                return res.status(400).json({ message: 'forneça um indentificador valido' });
            }
            const itemSelecionado = await pedidoModel.selectItemById(idItem);
            if (itemSelecionado.length === 0) {
                return res.status(200).json({ message: 'item não localizado na base de dados' });
            }
            const resultadoDelete = await pedidoModel.deleteItem(idPedido, idItem);

            if (resultadoDelete.affectedRows === 0) {
                return res.status(200).json({ message: 'ocorreu um erro ao exlcuir o item' });
            }
            res.status(200).json({ message: 'item excluido com sucesso', data: resultadoDelete });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        };
    }
};

module.exports = { pedidoController };
