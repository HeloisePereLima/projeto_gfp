import { BD } from "../db.js";
import bcrypt from 'bcrypt'

class rotasUsuarios{ 
    static async novoUsuario(req, res){
        const { nome, email, senha, tipo_acesso } = req.body;

        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        try{
            const usuario = await BD.query(`
                INSERT INTO usuarios(nome, email, senha, tipo_acesso)
                VALUES ($1, $2, $3, $4)
            `, [nome, email, senhaCriptografada, tipo_acesso])

            res.status(201).json('Usuario Cadastrado')
        }catch(error){
            console.error('erro ao criar usuario', error )
            res.status(500).json({message: 'Erro ao criar', error: error.message})
        }
    }

    static async atualizarTodos(req, res){
        const {id} = req.params
        const { nome, email, senha, tipo_acesso } = req.body;

        try{
            const usuario = await BD.query(
                `UPTADE usuarios SET nome = $1, email = $2, senha = $3, tipo_acesso = $4 where id_usuario = $5)`
                [nome, email, senha, tipo_acesso, id]
            )
            res.status(200).json(usuario.rows)
        }catch(error){
            res.status(500).json({message:
                "erro ao atualizar o usuario", error: error.message})
        }
    }

    static async atualizar(req, res){
        const {id} = req.params
        const { nome, email, senha, tipo_acesso } = req.body;
        try{
            const campos = []
            const valores = []

        if(nome !== undefined){
            campos.push(`nome = $${valores.length + 1}`)
            valores.push(nome)
        }
        if(email !== undefined){
            campos.push(`email = $${valores.length + 1}`)
            valores.push(email)
        }
        if(senha !== undefined){
            campos.push(`senha = $${valores.length + 1}`)
            valores.push(senha)
        }
        if(tipo_acesso !== undefined){
            campos.push(`tipo_acesso = $${valores.length + 1}`)
            valores.push(tipo_acesso)
        }
        if (campos.length === 0){
            return res.status(400).json({message: 'Nenhum campo fornecido para atualização'})
        }

        const query = `UPDATE usuarios
                            SET ${campos.join(', ')}
                            WHERE id_usuario = ${id}
                            RETURNING *`;
            
            const usuario = await BD.query(query, valores)
        if(usuario.rows.length === 0){
            return res.status(404).json({message: 'Usuario não encontrado'})
        }
        return res.status(200).json(usuario.rows[0]);
        }catch(error){
            res.status(500).json({message:"erro ao atualizar o usuario", error: error.message})
        }
    } 
    static async deletar (req, res){
        const {id} = req.params
        try{
            const usuario = await BD.query(`UPDATE usuarios SET ativo = false WHERE id_usuario = $1`, [id] )
            return res.status(200).json({message: "Usuario desativado com sucesso"})
        }catch(error){
            res.status(500).json({message: "Erro ao deletar usuario", error: error.message}) 
        }
    }
    static async listarUsuario(req, res){
        try{
           const usuarios = await BD.query('SELECT * FROM usuarios WHERE ativo = true ')
            res.status(200).json(usuarios.rows);
        }catch(error){
            res.status(500).json({message: 'Erro ao listar os usuarios', error: error.message})
        }
    }
    static async listarUsuarioPorId(req, res){
        const {id} = req.params
        try{
            const usuarios = await BD.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id])
            res.status(200).json(usuarios.rows)
        }catch(error){
            res.status(500).json({message: 'Erro ao listar os usuarios por id', error: error.message})
        }
    }



    static async login(req, res){
        const {email, senha} = req.body

        try{
            const login = await BD.query(
                `SELECT id_usuario, nome, email, senha, tipo_acesso
                FROM usuarios WHERE email = $1 `, [email]
            )
            if(login.rows.length === 0 ) {
                return res.status(401).json({message: 'Login errado'})
            }
            const usuario = login.rows[0];
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

            if(!senhaCorreta){
                return res.status(401).json('Email ou senha invalidos')
            }
            // const token = jwt.sign(
            //     {id: usuario.id, nome: usuario.nome, email: usuario.email},
            //     SECRET_KEY, 
            //     {expiresIn: '1h'}
            // )
            // return res.status(200).json({message: "Login realizado com sucesso", token})
            
            return res.status(200).json({message: "login realizado com sucesso", usuario})
        }catch(error){
            console.error("Erro ao realizar login:", error)
            return res.status(500).json({message: "Erro ao realizar login", erro: error.message})
        }
    }
}

export default rotasUsuarios;