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

    updateClienteCompleto: async (pIdCliente, pDados) => {
        const connection = await pool.getConnection();
    
        try {
            await connection.beginTransaction();
    
            let totalAffected = 0;
            let totalChanged = 0;
    
            if (pDados.nome || pDados.cpf || pDados.email) {
                const campos = [];
                const valores = [];
    
                if (pDados.nome) { campos.push("nome = ?"); valores.push(pDados.nome); }
                if (pDados.cpf) { campos.push("cpf = ?"); valores.push(pDados.cpf); }
                if (pDados.email) { campos.push("email = ?"); valores.push(pDados.email); }
    
                valores.push(pIdCliente);
    
                const [resultCliente] = await connection.query(
                    `UPDATE clientes SET ${campos.join(", ")} WHERE id_cliente = ?`,
                    valores
                );
    
                totalAffected += resultCliente.affectedRows;
                totalChanged += resultCliente.changedRows;
            }
    
            if (pDados.cep || pDados.numero || pDados.complemento) {
                const campos = [];
                const valores = [];
    
                if (pDados.cep) { campos.push("cep = ?"); valores.push(pDados.cep); }
                if (pDados.numero) { campos.push("numero = ?"); valores.push(pDados.numero); }
                if (pDados.complemento) { campos.push("complemento = ?"); valores.push(pDados.complemento); }
    
                valores.push(pIdCliente);
    
                const [resultEndereco] = await connection.query(
                    `UPDATE enderecos 
                     SET ${campos.join(", ")}
                     WHERE clientes_id_cliente = ?`,
                    valores
                );
    
                totalAffected += resultEndereco.affectedRows;
                totalChanged += resultEndereco.changedRows;
            }
    
            if (pDados.telefones && Array.isArray(pDados.telefones)) {
                const [delResult] = await connection.query(
                    `DELETE FROM telefones WHERE clientes_id_cliente = ?`,
                    [pIdCliente]
                );
    
                totalAffected += delResult.affectedRows;
                totalChanged += delResult.affectedRows; 
    
                for (let tel of pDados.telefones) {
                    const [insertResult] = await connection.query(
                        `INSERT INTO telefones (telefone, clientes_id_cliente)
                         VALUES (?, ?)`,
                        [tel, pIdCliente]
                    );
    
                    totalAffected += insertResult.affectedRows;
                    totalChanged += insertResult.affectedRows; 
                }
            }
    
            await connection.commit();
    
            return {
                affectedRows: totalAffected,
                changedRows: totalChanged
            };
    
        } catch (error) {
            await connection.rollback();
            throw error;
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
