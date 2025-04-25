import { BD } from "../db.js";

class rotasLocalTransacao {
    static async nova(req, res){
        const { nome, tipo_local, saldo, ativo } = req.body;
        
        try{
            const categoria = await BD.query(`
                INSERT INTO local_transacao (nome, tipo_local, saldo, ativo) VALUES ($1, $2, $3, $4)
                `, [nome, tipo_local, saldo, ativo])
            res.status(201).json('Local Transacoes cadastradas')
        }catch(error){
            console.error('erro ao criar local transacoes', error)
            res.status(500).json({message: 'Erro ao criar local transacoes', error: error.message})
        } 
    }
}

export default rotasLocalTransacao