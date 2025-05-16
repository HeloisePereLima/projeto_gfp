import { BD } from "../db.js";

class rotasContas {
    static async nova(req, res){
        const { nome, tipo_conta, saldo, ativo, conta_padrao } = req.body;
        
        try{
            const conta = await BD.query(`
                INSERT INTO contas (nome, tipo_conta, saldo, ativo, conta_padrao) VALUES ($1, $2, $3, $4, $5)
                `, [nome, tipo_conta, saldo, ativo, conta_padrao])
            res.status(201).json('Contas cadastradas')
        }catch(error){
            console.error('erro ao criar contas', error)
            res.status(500).json({message: 'Erro ao criar local transacoes', error: error.message})
        } 
    }
    static async listar (req, res){
        try{
         const contas = await BD.query('SELECT * FROM contas ')
             res.status(200).json(contas.rows);
        }catch(error){
             res.status(500).json({message: 'Erro ao listar as contas', error: error.message})
        }
     }
     static async listarPorId(req, res){
        const {id} = req.params
        try{
            const conta = await BD.query('SELECT * FROM contas WHERE id_conta = $1', [id])
            res.status(200).json(conta.rows)
        }catch(error){
            res.status(500).json({message: 'Erro ao listar as contas por id', error: error.message})
        }
    }
    static async deletar (req, res){
        const {id} = req.params
        try{
            const contas = await BD.query(`UPDATE contas SET ativo = false WHERE id_conta = $1`, [id] )
            return res.status(200).json({message: "conta desativada com sucesso"})
        }catch(error){
            res.status(500).json({message: "Erro ao deletar conta", error: error.message}) 
        }
    }
    static async atualizarTodos(req, res){
        const {id} = req.params
        const { nome, tipo_conta, saldo, ativo, conta_padrao } = req.body

        try{
            const conta = await BD.query(`
                UPTADE contas SET nome = $1, tipo_conta = $2, saldo = $3, ativo = $4, conta_padrao =$5)`
                [ nome, tipo_conta, saldo, ativo, conta_padrao, id])

            res.status(201).json('conta atualizadas')
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar conta', error: error.message})
        }
    }
    static async atualizar(req, res) {
    const {id} = req.params
    const {nome, tipo_conta, saldo, ativo, conta_padrao} = req.body;

    try{
        const campos = [];
        const valores = [];

      if(nome !== undefined){
        campos.push(`nome = $${valores.length + 1 }`) 
        valores.push(nome);
    }

    if(tipo_conta !== undefined){
        campos.push(`tipo_conta  = $${valores.length + 1 }`)
        valores.push(tipo_conta );
    }

    if(saldo !== undefined){
        campos.push(`saldo = $${valores.length + 1 }`)
        valores.push(saldo);
    }
    if(ativo !== undefined){
        campos.push(`ativo = $${valores.length + 1 }`)
        valores.push(ativo);
    }
    if( conta_padrao !== undefined){
        campos.push(`conta_padrao = $${valores.length + 1 }`)
        valores.push(conta_padrao);
    }

    if(campos.length === 0 ){
        console.log('1')
        return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
       
    }
    
    const query = `UPDATE contas SET ${campos.join(", ")} WHERE id_conta = ${id} RETURNING *`
    const contas = await BD.query(query, valores)

    if (contas.rows.length === 0) {
        console.log('2')
        return res.status(401).json({message: " conta não encontrada"})
    }
    return res.status(200).json({message: "conta atualizada"})
    }catch(error){
        console.log('3')
        res.status(500).json({message: 'Erro ao listar as contas por Id', error: error.message})
    }
}
    
    static async filtrarNome(req, res){
        const { nome } = req.query;
        try{
            const query = `
            SELECT * FROM contas 
            WHERE nome LIKE $1 AND ativo = true 
            ORDER BY nome DESC
            `
            const valores = [`%${nome}%`]
            const resposta = await BD.query(query, valores)
            return res.status(200).json(resposta.rows)
        }catch(error){
            console.error('Erro ao filtrar categoria', error);
            res.status(500).json({message: "Erro ao filtrar categoria", error: error.message})
        }
    }
}

export default rotasContas;