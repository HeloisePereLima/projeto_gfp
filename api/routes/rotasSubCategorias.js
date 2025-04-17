import { BD } from "../db.js"; 

class rotasSubCategorias{
    static async nova(req, res){
        const {nome, id_categoria, gasto_fixo} = req.body

        try{
            const subCategorias = await BD.query(`
                INSERT INTO subcategorias (nome, id_categoria, gasto_fixo) VALUES ($1, $2, $3)
                `, [nome, id_categoria, gasto_fixo ])
            res.status(201).json('subCategoria cadastradas')
        }catch(error){
            console.error('erro ao criar subCategoria', error)
            res.status(500).json({message: 'Erro ao criar subCategorias', error: error.message})
        }
    }

    static async atualizarTodos(req, res){
        const {id} = req.params
        const { nome, id_categoria, gasto_fixo } = req.body;

        try{
            const subcategoria = await BD.query(
                `UPDATE subcategorias SET nome = $1, id_categoria = $2, gasto_fixo = $3  WHERE id_subcategoria = $4`
                [nome, id_categoria, gasto_fixo, id ]
            )
            return res.status(200).json(subcategoria.rows[0])
        }catch(error){
            res.status(500).json({message:
                "erro ao atualizar a subCategoria", error: error.message})
        }
    }

    static async listar (req, res){
        try{
         const subCategoria = await BD.query('SELECT * FROM subcategorias ')
             res.status(200).json(subCategoria.rows);
        }catch(error){
             res.status(500).json({message: 'Erro ao listar as subcategorias', error: error.message})
        }
     }
     static async listarPorId(req, res){
        const {id} = req.params

        try{
            const subcategoria = await BD.query('SELECT * FROM subcategorias WHERE id_subcategoria = $1', [id])
            res.status(200).json(subcategoria.rows)
        }catch(error){
            res.status(500).json({message: 'Erro ao listar as subcategorias por Id', error: error.message})
        }
     }
     
    static async atualizar(req, res) {
    const {id} = req.params
    const {nome, gasto_fixo, id_categoria} = req.body;

    try{
        const campos = [];
        const valores = [];

      if(nome !== undefined){
        campos.push(`nome = $${valores.length + 1 }`) 
        valores.push(nome);
    }

    if(gasto_fixo!== undefined){
        campos.push(`gasto_fixo = $${valores.length + 1 }`)
        valores.push(gasto_fixo);
    }

    if(id_categoria !== undefined){
        campos.push(`id_categoria = $${valores.length + 1 }`)
        valores.push(id_categoria);
    }

   
    if(campos.length === 0 ){
        console.log('1')
        return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
       
    }

    const query = `UPDATE subcategorias SET ${campos.join(", ")} WHERE id_subcategoria = ${id} RETURNING *`
    const subCategoria = await BD.query(query, valores)

    if (subCategoria.rows.length === 0) {
        console.log('2')
        return res.status(401).json({message: "Subcategoria não encontrada"})
    }
    return res.status(200).json({message: "Subcategoria atualizada"})
    }catch(error){
        console.log('3')
        res.status(500).json({message: 'Erro ao listar as subcategorias por Id', error: error.message})
    }

    }
}

export default rotasSubCategorias