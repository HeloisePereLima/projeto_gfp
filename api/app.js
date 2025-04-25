import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js'
import rotasCategorias from './routes/rotasCategorias.js'
import rotasSubCategorias from './routes/rotasSubCategorias.js'
import rotasTransacoes from './routes/rotasTransacoes.js'
import rotasLocalTransacao from './routes/rotasLocalTransacoes.js'

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
app.patch('/usuarios/:id', autenticarToken, rotasUsuarios.atualizar)
app.delete('/usuarios/:id', autenticarToken, rotasUsuarios.deletar)
app.get('/usuarios', autenticarToken, rotasUsuarios.listarUsuario)
app.get('/usuarios/:id', rotasUsuarios.listarUsuarioPorId)
app.post ('/usuarios/login', rotasUsuarios.login)


//rotas categorias
app.post ('/categorias', autenticarToken, rotasCategorias.nova)
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
app.delete('/subCategorias/:id', rotasSubCategorias.deletar)

//rotas Transacoes
app.post('/transacoes', rotasTransacoes.NovaTransacao)
app.put('/transacoes/:id', rotasTransacoes.atualizarTodos)
app.delete('/transacoes/:id', rotasTransacoes.deletar)
app.get('/transacoes/:id', rotasTransacoes.listar)
app.get('/transacoes/:id', rotasTransacoes.listarPorId)


//rotas Local transacoes
app.post('/localTransacoes', rotasLocalTransacao.nova)


const porta = 3000
app.listen(porta, () =>{
    console.log(`Api http://localhost:${porta}`)
})