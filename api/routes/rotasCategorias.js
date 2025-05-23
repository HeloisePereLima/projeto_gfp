import { BD } from "../db.js";
import bcrypt from 'bcrypt'

class rotasCategorias{
    static async nova(req, res){
        const { nome, tipo_transacao, gasto_fixo, id_usuario } = req.body;

        
        try{
            const categoria = await BD.query(`
                INSERT INTO categorias(nome, tipo_transacao, gasto_fixo, id_usuario) VALUES ($1, $2, $3, $4)
                `, [nome, tipo_transacao, gasto_fixo, id_usuario])
            res.status(201).json('categorias cadastradas')
        }catch(error){
            console.error('erro ao criar categoria', error)
            res.status(500).json({message: 'Erro ao criar categorias', error: error.message})
        } 
    }
    static async atualizarTodos(req, res){
        const {id} = req.params
        const {nome, tipo_transacao, gasto_fixo, id_usuario } = req.body

        try{
            const categoria = await BD.query(`
                UPTADE categorias SET nome = $1, tipo_transacao = $2, gasto_fixo = $3, id_usuario =$4 where id_categoria = $5)`
            [nome, tipo_transacao, gasto_fixo, id_usuario, id])

            res.status(201).json('categorias atualizadas')
        }catch(error){
            res.status(500).json({message: 'Erro ao criar categorias', error: error.message})
        }
    }

    static async atualizar(req, res){
        const {id} = req.params
        const {nome, tipo_transacao, gasto_fixo, id_usuario} = req.body

        try{
            const campos = []
            const valores = []

        if(nome !== undefined){
            campos.push(`nome = $${valores.length + 1}`)
            valores.push(nome)
        }
        if(tipo_transacao !== undefined){
            campos.push(`tipo_transacao = $${valores.length + 1}`)
            valores.push(tipo_transacao)
        }
        if(gasto_fixo !== undefined){
            campos.push(`gasto_fixo = $${valores.length + 1}`)
            valores.push(gasto_fixo)
        }
        if(id_usuario !== undefined){
            campos.push(`id_usuario = $${valores.length + 1}`)
            valores.push(id_usuario)
        }
        if (campos.length === 0){
            return res.status(400).json({message: 'Nenhum campo fornecido para atualização'})
        }
        const query = `UPDATE categorias
                     SET ${campos.join(', ')} WHERE id_categoria = ${id} RETURNING *`;
            
        const categoria = await BD.query(query, valores)
        if(categoria.rows.length === 0){
            console.log('5')
            return res.status(404).json({message: 'categoria não encontrado'})
        }
        
        return res.status(201).json('categoria atualizada')
        }catch(error){
            res.status(500).json({message:"Erro ao atualizar categorias"})
        }
    }
    static async deletar (req, res){
        const {id} = req.params
        try{
            const categoria = await BD.query(`DELETE categorias SET ativo = false WHERE id_categoria = $1`, [id] )
            return res.status(200).json({message: "categoria atualizada com sucesso"})
        }catch(error){
            res.status(500).json({message: "Erro ao deletar categoria", error: error.message}) 
        }
    }

    static async listar (req, res){
       try{
        const usuarios = await BD.query('SELECT * FROM categorias ')
            res.status(200).json(usuarios.rows);
       }catch(error){
            res.status(500).json({message: 'Erro ao listar as categorias', error: error.message})
       }
    }

    static async listarPorId(req, res){
        const {id} = req.params
        try{
            const categoria = await BD.query('SELECT * FROM categorias WHERE id_categoria = $1', [id])
            res.status(200).json(categoria.rows)
        }catch(error){
            res.status(500).json({message: 'Erro ao listar as categorias por id', error: error.message})
        }
    }
    //filtrar por tipo de categoria 
    static async filtrarCategoria(req, res){
        const { tipo_transacao } = req.query;
        try{
            const query = `
            SELECT * FROM categorias WHERE tipo_transacao = $1 AND ativo = true 
            ORDER BY id_categoria DESC
            `
            const valores = [tipo_transacao]

            const resposta = await BD.query(query, valores)
            return res.status(200).json(resposta.rows)
        }catch(error){
            console.error('Erro ao filtrar categoria', error);
            res.status(500).json({message: "Erro ao filtrar categoria", error: error.message})
        }
    }
}

export default rotasCategorias