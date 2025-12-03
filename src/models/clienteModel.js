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
                ender.numero,
                ender.complemento,
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
                ender.numero,
                ender.complemento,
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
            const [rows] = await connection.query(sqlCliente, [pNome, pCpf, pEmail]);

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

    updateClienteCompleto: async (id, dados) => {
        const connection = await pool.getConnection();
    
        try {
            await connection.beginTransaction();
    
            // 1. Atualiza cliente
            if (dados.nome || dados.cpf || dados.email) {
                const campos = [];
                const valores = [];
    
                if (dados.nome) { campos.push("nome = ?"); valores.push(dados.nome); }
                if (dados.cpf) { campos.push("cpf = ?"); valores.push(dados.cpf); }
                if (dados.email) { campos.push("email = ?"); valores.push(dados.email); }
    
                valores.push(id);
    
                await connection.query(
                    `UPDATE clientes SET ${campos.join(", ")} WHERE id_cliente = ?`,
                    valores
                );
            }
    
            // 2. Atualiza endereço (se tiver qualquer campo de endereço)
            if (dados.cep || dados.numero || dados.complemento) {
    
                const campos = [];
                const valores = [];
    
                if (dados.cep) { campos.push("cep = ?"); valores.push(dados.cep); }
                if (dados.numero) { campos.push("numero = ?"); valores.push(dados.numero); }
                if (dados.complemento) { campos.push("complemento = ?"); valores.push(dados.complemento); }
    
                valores.push(id);
    
                await connection.query(
                    `UPDATE enderecos 
                     SET ${campos.join(", ")}
                     WHERE clientes_id_cliente = ?`,
                    valores
                );
            }
    
            // 3. Telefones — se a requisição enviar telefones, então atualiza
            if (dados.telefones && Array.isArray(dados.telefones)) {
                await connection.query(`DELETE FROM telefones WHERE clientes_id_cliente = ?`, [id]);
    
                for (let tel of dados.telefones) {
                    await connection.query(
                        `INSERT INTO telefones (telefone, clientes_id_cliente)
                         VALUES (?, ?)`,
                        [tel, id]
                    );
                }
            }
    
            await connection.commit();
            return { message: "Cliente atualizado com sucesso" };
    
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
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
