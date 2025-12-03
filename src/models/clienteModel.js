const { pool } = require('../config/db');

const clienteModel = {

    listarCliente: async () => {
        const sql =
            `SELECT 
	            id_cliente, 
	            nome, 
	            cpf, 
	            email, 
	            ender.cep, 
	            tel.telefone
            FROM clientes cli
            join enderecos ender on cli.id_cliente = ender.clientes_id_cliente
            join telefones tel on cli.id_cliente = tel.clientes_id_cliente;`;
        const [rows] = await pool.query(sql);
        return rows;
    },

    selectClienteById: async (pIdCliente) => {
        const sql = `
            SELECT 
	            id_cliente, 
	            nome, 
	            cpf, 
	            email, 
	            ender.cep, 
	            tel.telefone
            FROM clientes cli
            join enderecos ender on cli.id_cliente = ender.clientes_id_cliente
            join telefones tel on cli.id_cliente = tel.clientes_id_cliente
            WHERE id_cliente = ?;`;
        const values = [pIdCliente]
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    selectByCpf: async (pCpf) => {
        const sql = 'SELECT cpf FROM clientes WHERE cpf =?;';
        const values = [pCpf]
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    insertClienteCompleto: async (pNome, pCpf, pEmail, pEndereco, pTelefones) => {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const sqlCliente = `
                INSERT INTO clientes (nome, cpf, email)
                VALUES (?, ?, ?);
            `;
            const [rows] = await connection.query(sqlCliente, [
                pNome,
                pCpf,
                pEmail
            ]);

            const novoIdCliente = rows.insertId;

            const sqlEndereco = `
                INSERT INTO enderecos 
                (clientes_id_cliente, rua, bairro, cidade, uf, cep, numero, complemento)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;

            await connection.query(sqlEndereco, [
                novoIdCliente,
                pEndereco.rua,
                pEndereco.bairro,
                pEndereco.cidade,
                pEndereco.uf,
                pEndereco.cep,
                pEndereco.numero,
                pEndereco.complemento
            ]);

            const sqlTelefone = `
                INSERT INTO telefones (telefone, clientes_id_cliente)
                VALUES (?, ?);
            `;

            for (let tel of pTelefones) {
                await connection.query(sqlTelefone, [tel, novoIdCliente]);
            }

            await connection.commit();
            return { id_cliente: novoIdCliente };

        } catch (error) {
            await connection.rollback();
            throw error;
        }
    },

    updateCliente: async (pIdCliente, nome, email) => {
        const sql = `UPDATE clientes SET nome = ?, email = ?WHERE id_cliente = ?;`;
        const values = [nome, email, pIdCliente];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

    deleteCliente: async (pIdCliente) => {
        const sqlTelefones = `DELETE FROM telefones WHERE clientes_id_cliente = ?;`;
        const sqlEnderecos = `DELETE FROM enderecos WHERE clientes_id_cliente = ?;`;
        const sqlClientes = `DELETE FROM clientes WHERE id_cliente = ?;`;
        const values = [pIdCliente];
        await pool.query(sqlTelefones, values);
        await pool.query(sqlEnderecos, values);
        const [rows] = await pool.query(sqlClientes, values);
        return rows;
    },


};

module.exports = { clienteModel };
