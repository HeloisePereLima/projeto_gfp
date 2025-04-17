import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios from './routes/rotasUsuarios.js'
import rotasCategorias from './routes/rotasCategorias.js'
import rotasSubCategorias from './routes/rotasSubCategorias.js'

const app = express()
testarConexao()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>{
    res.send('API Funcionando!')
})

//Rotas usuarios
app.post ('/usuarios', rotasUsuarios.novoUsuario)
app.put ('/usuarios/:id', rotasUsuarios.atualizarTodos)
app.patch('/usuarios/:id', rotasUsuarios.atualizar)
app.delete('/usuarios/:id', rotasUsuarios.deletar)
app.get('/usuarios/:id', rotasUsuarios.listarUsuario)
app.get('/usuarios/:id', rotasUsuarios.listarUsuarioPorId)
app.post ('/usuarios/login', rotasUsuarios.login)


//rotas categorias
app.post ('/categorias', rotasCategorias.nova)
app.put('/categorias/:id', rotasCategorias.atualizarTodos)
app.patch('/categorias/:id', rotasCategorias.atualizar)
app.delete('/categorias/:id', rotasCategorias.deletar)
app.get('/categorias', rotasCategorias.listar)
app.get('/categorias/:id', rotasCategorias.listarPorId)

//rotas subcategorias
app.post ('/subCategorias', rotasSubCategorias.nova)
app.get('/subCategorias', rotasSubCategorias.listar)
app.get('/subCategorias/:id', rotasSubCategorias.listarPorId)
app.put('/subCategorias/:id', rotasSubCategorias.atualizarTodos)
app.patch('/subCategorias/:id', rotasSubCategorias.atualizar)



const porta = 3000
app.listen(porta, () =>{
    console.log(`Api http://localhost:${porta}`)
})