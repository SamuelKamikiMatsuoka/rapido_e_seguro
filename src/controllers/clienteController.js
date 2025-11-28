const { clienteModel } = require('../models/clienteModel');

const clienteController = {

    listarClientes: async (req, res) => {
        try {
            const { idCliente } = req.params;

            let resultado;
            if (idCliente) {
                resultado = await clienteModel.buscarClientePorId(idCliente);
                if (resultado.length === 0) {
                    return res.status(200).json({ message: "cliente não encontrado" });
                }
            } else {
                resultado = await clienteModel.listarTodosClientes();
            }

            res.status(200).json(resultado);
        } catch (error) {
          res.status(500).json({ error: "erro ao buscar cliente" });
        }
    },

    cadastrarCliente: async (req, res) => {
        try {
            const dados = req.body;
            const resultado = await clienteModel.cadastrarCliente(dados);

            return res.status(201).json({ message: "cliente cadastrado", id: resultado.insertId });
        } catch (error) {
            return res.status(500).json({ error: "erro ao cadastrar cliente" });
        }
    },

    atualizarCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;
            const dados = req.body;

            const resultado = await clienteModel.atualizarCliente(idCliente, dados);

            if (resultado.affectedRows === 0) {
                return res.status(200).json({ message: "cliente não encontrado" });
            }

            return res.status(200).json({ message: "cliente atualizado" });
        } catch (error) {
            return res.status(500).json({ error: "erro ao atualizar cliente" });
        }
    },

    excluirCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;

            const resultado = await clienteModel.deletarCliente(idCliente);

            if (resultado.affectedRows === 0) {
                return res.status(200).json({ message: "cliente não encontrado" });
            }

            return res.status(200).json({ message: "cliente deletado" });
        } catch (error) {
            return res.status(500).json({ error: "erro ao deletar cliente" });
        }
    }
};

module.exports = { clienteController };
