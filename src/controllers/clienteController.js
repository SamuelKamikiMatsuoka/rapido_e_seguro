const { clienteModel } = require('../models/clienteModel');

async function buscarCep (cep) {
    const limpa = cep.replace(/\D/g, '');
    if (cep.length != 8) {
        throw new Error('CEP inválido!');
    }
    const response = await fetch(`https://viacep.com.br/ws/${limpa}/json/`);

    console.log(response);
    
    const data = await response.json();

    if (data.erro) {
        throw new Error('CEP não encontrado');
    }
    return data;
    
};



const clienteController = {

    listarClientes: async (req, res) => {
        try {
            const idCliente = req.query.idCliente;
            const consulta = idCliente ? clienteModel.selectClienteById(idCliente) : clienteModel.listarCliente();
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

    
        insertClienteCompleto: async (req, res) => {
            try {
                const { nome, cpf, email, cep, numero, complemento, telefones } = req.body;
                
                if (!nome || !cpf || !email || !cep || !numero || !complemento || !telefones) {
                    return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
                }

                if (!Array.isArray(telefones) || telefones.length === 0) {
                    return res.status(400).json({ message: 'Informe pelo menos um telefone válido' });
                }

                if (cpf.length !== 11) {
                    return res.status(400).json({ message: 'CPF inválido! O CPF deve ter 11 dígitos.'});
                }
            
                const cpfExistente = await clienteModel.selectByCpf(cpf)

                if (cpfExistente && cpfExistente.length > 0) {
                    return res.status(409).json({ message: `O CPF informado já existe no sistema. Não foi possivel realizar a inserção`});
                }

                const dadosCep = await buscarCep(cep);
    
                const endereco = {
                    rua: dadosCep.logradouro,
                    bairro: dadosCep.bairro,
                    cidade: dadosCep.localidade,
                    uf: dadosCep.uf,
                    cep,
                    numero,
                    complemento
                };
        
                const result = await clienteModel.insertClienteCompleto(
                    nome, cpf, email, endereco, telefones
                );
        
                res.status(201).json({message: 'Registro incluindo com sucesso', data: result});
        
            } catch (error) {
                console.error(error);
                res.status(500).json({message: `Ocorreu um erro no servidor`, 
                    errorMessage: error.message});
            }
        },

        atualizarCliente: async (req, res) => {
            try {
                const { idCliente } = req.params;
                const dados = req.body; 
        
                if (!dados) {
                    return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
                };
    
                const cpfExistente = await clienteModel.selectByCpf(dados.cpf)
    
                if (cpfExistente && cpfExistente.length > 0 ) {
                    return res.status(409).json({ message: 'O CPF informado já existe no sistema. Não foi possivel realizar a alteração' });
                }
    
                const clienteAtual = await clienteModel.selectClienteById(idCliente);
    
                if (clienteAtual.length === 0) {
                    return res.status(200).json({ message: 'Cliente não localizado' });
                };
    
                const resultUpdate = await clienteModel.updateClienteCompleto(idCliente, dados);
    
                if (resultUpdate.affectedRows === 1 && resultUpdate.changedRows === 0) {
                    return res.status(200).json({ message: 'Não há alterações a serem realizadas.' });
                };
    
                if (resultUpdate.changedRows > 0) {
                    res.status(200).json({ message: 'O registro foi alterado com sucesso.' });
                };
    
        
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Erro no servidor",
                    errorMessage: error.message
                });
            }
        },
        
    excluirCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;

            const resultado = await clienteModel.deleteCliente(idCliente);

            if (resultado.affectedRows === 0) {
                return res.status(200).json({ message: "cliente não encontrado" });
            }

             res.status(200).json({ message: "cliente deletado" });

        } catch (error) {
            console.error(error);
            res.status(500).json({message: `Ocorreu um erro no servidor`, 
                errorMessage: error.message});
        }
    }
};

module.exports = { clienteController };
