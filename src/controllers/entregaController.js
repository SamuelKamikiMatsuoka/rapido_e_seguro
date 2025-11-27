const { entregaModel } = require('../models/entregaModel');

const entregaController = {

    criarEntrega: async (req, res) => {
        try {
            const { id_pedido, valor_distancia, valor_peso, acrescimo, desconto, taxa_extra, valor_final, status_entrega } = req.body;

            if (!id_pedido || !valor_distancia || !valor_peso || acrescimo === undefined ||
                desconto === undefined || taxa_extra === undefined || !valor_final || !status_entrega) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const resultado = await entregaModel.insertEntrega(
                id_pedido, valor_distancia, valor_peso, acrescimo, desconto, taxa_extra, valor_final, status_entrega
            );

            res.status(201).json({ message: 'Registro incluído com sucesso!', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    listarEntrega: async (req, res) => {
        try {
            const entregas = await entregaModel.listarTodasEntregas();
            return res.status(200).json(entregas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao listar entregas', errorMessage: error.message });
        }
    },

    buscarEntrega: async (req, res) => {
        try {
            const idEntrega = Number(req.params.idEntrega);

            if (!idEntrega || !Number.isInteger(idEntrega)) {
                return res.status(400).json({ message: 'Forneça um identificador válido' });
            }

            const entrega = await entregaModel.selectEntregaById(idEntrega);

            if (entrega.length === 0) {
                return res.status(200).json({ message: 'Entrega não encontrada' });
            }

            return res.status(200).json(entrega);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar entrega', errorMessage: error.message });
        }
    },

    atualizarEntrega: async (req, res) => {
        try {
            const idEntrega = Number(req.params.idEntrega);
            const dados = req.body;

            if (!idEntrega || !Number.isInteger(idEntrega)) {
                return res.status(400).json({ message: 'Forneça um identificador válido' });
            }

            const entrega = await entregaModel.selectEntregaById(idEntrega);
            if (entrega.length === 0) {
                return res.status(200).json({ message: 'Entrega não encontrada' });
            }

            const resultado = await entregaModel.updateEntrega(idEntrega, dados);

            if (resultado.affectedRows === 0) {
                return res.status(200).json({ message: 'Nenhuma alteração realizada' });
            }

            return res.status(200).json({ message: 'Entrega atualizada com sucesso' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar entrega', errorMessage: error.message });
        }
    },

    excluirEntrega: async (req, res) => {
        try {
            const idEntrega = Number(req.params.idEntrega);

            if (!idEntrega || !Number.isInteger(idEntrega)) {
                return res.status(400).json({ message: 'Forneça um identificador válido' });
            }

            const entregaSelecionada = await entregaModel.selectEntregaById(idEntrega);
            if (entregaSelecionada.length === 0) {
                return res.status(200).json({ message: 'Entrega não localizada na base de dados' });
            }

            const resultadoDelete = await entregaModel.deleteEntrega(idEntrega);

            if (resultadoDelete.affectedRows === 0) {
                return res.status(200).json({ message: 'Ocorreu um erro ao excluir a entrega' });
            }

            res.status(200).json({ message: 'Entrega excluída com sucesso', data: resultadoDelete });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};

module.exports = { entregaController };
