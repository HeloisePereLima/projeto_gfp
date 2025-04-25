import { BD } from "../db.js"

class rotasTransacoes{
    static async NovaTransacao(req, res){
        const {valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
            id_local_transacao, id_categoria, id_usuario, id_subcategoria } = req.body
        
    try{
        const transacoes = await BD.query(`
            INSERT INTO transacoes(valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
            id_local_transacao, id_categoria, id_usuario, id_subcategoria )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, [valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
                id_local_transacao, id_categoria, id_usuario, id_subcategoria ])
        res.status(201).json('transacoes cadastradas')
    }catch(error){
        console.error('erro ao criar transacoes', error)
        res.status(500).json({message: 'Erro ao criar transacoes', error: error.message})   
     }
    }
    static async atualizarTodos(req, res){
        const {id} = req.params
        const {valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
            id_local_transacao, id_categoria, id_usuario, id_subcategoria } = req.body

        try{
            const Transacoes = await BD.query(`
                UPTADE transacoes SET valor = $1, descricao = $2, data_transacao = $3, data_vencimento = $4,
                 data_pagamento =  $5, tipo_transacao= $6, num_parcelas =$7, parcela_atual = $8,
            id_local_transacao = $9, id_categoria = $10, id_usuario = $11, id_subcategoria = $12)`
            [valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
                id_local_transacao, id_categoria, id_usuario, id_subcategoria,  id])

            res.status(201).json('transacoes atualizadas')
        }catch(error){
            res.status(500).json({message: 'Erro ao criar transacoes', error: error.message})
        }
    }

    static async deletar (req, res){
        const {id} = req.params
        try{
            const transacao = await BD.query(`UPDATE transacoes SET ativo = false WHERE id_transacao = $1`, [id] )
            return res.status(200).json({message: "transacao desativada com sucesso"})
        }catch(error){
            res.status(500).json({message: "Erro ao deletar transacao", error: error.message}) 
        }
    }

    static async listar (req, res){
        try{
         const transacao = await BD.query('SELECT * FROM transacoes ')
             res.status(200).json(transacao.rows);
        }catch(error){
             res.status(500).json({message: 'Erro ao listar as transacoes', error: error.message})
        }
     }

     static async listarPorId(req, res){
        const {id} = req.params
        try{
            const transacao = await BD.query('SELECT * FROM transacoes WHERE id_transacao = $1', [id])
            res.status(200).json(transacao.rows)
        }catch(error){
            res.status(500).json({message: 'Erro ao listar as transacoes por id', error: error.message})
        }
    }
}

export default rotasTransacoes