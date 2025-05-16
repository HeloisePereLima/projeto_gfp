import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js'
import rotasCategorias from './routes/rotasCategorias.js'
import rotasSubCategorias from './routes/rotasSubCategorias.js'
import rotasTransacoes from './routes/rotasTransacoes.js'
import rotasContas from './routes/rotasContas.js'

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
app.get('/categorias/filtrarCategoria', rotasCategorias.filtrarCategoria)
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
app.get('/transacoes/somarTransacoes', rotasTransacoes.somarTransacoes)
app.get('/transacoes/filtroData', rotasTransacoes.filtrarPorData)
app.get('/transacoes/transacoesVencidas/:id_usuario', rotasTransacoes.transacoesVencidas)
app.put('/transacoes/:id', rotasTransacoes.atualizarTodos)
app.patch('/transacoes/:id', rotasTransacoes.atualizar)
app.delete('/transacoes/:id', rotasTransacoes.deletar)
app.get('/transacoes', rotasTransacoes.listar)
app.get('/transacoes/:id', rotasTransacoes.listarPorId)



//rotas Local contas
app.post('/contas', rotasContas.nova)
app.get('/contas/filtrarNome', rotasContas.filtrarNome)
app.get('/contas', rotasContas.listar)
app.get('/contas/:id', rotasContas.listarPorId)
app.delete('/contas/:id',rotasContas.deletar)
app.put('/contas/:id', rotasContas.atualizarTodos)
app.patch('/contas/:id', rotasContas.atualizar)



const porta = 3000
app.listen(porta, () =>{
    console.log(`Api http://localhost:${porta}`)
})