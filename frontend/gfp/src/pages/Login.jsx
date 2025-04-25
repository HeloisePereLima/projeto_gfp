import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { enderecoServidor } from '../utils';

const Login = ({ navigation }) =>{

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')

    const navigate = useNavigate()

    async function botaoEntrar(e) {
        e.preventDefault()
    
        try{
            if(email == '' || senha == '') {
                throw new Error('Preencha todos os campos')
            }
    
            //Authenticando utilizando a API de backend com o fetch
            const resposta = await fetch(`${enderecoServidor}/usuarios/login`, 
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: email,
                        senha: senha,
                    })
                }
            )
            if (resposta.ok) {
                const dados = await resposta.json()
               
                setMensagem('Login bem-sucedido!')
                navigate("/principal")
                localStorage.setItem("UsuarioLogado", JSON.stringify(dados));
            }else {
                setMensagem('Email ou senha incoretos ❌')
                throw new Error('Email ou senha incoretos ❌')
            }
        } catch (error) {
            console.error('Erro ao realizar login', error)
            alert(error.message)
            return
        }
      }
    
    return(
        <div style={{backgroundColor:"#eef1ef", borderRadius:50, width: 800, alignItems: "center"
        }}>
            <h1 style={{color:"#8338ec", textAlign:"center"}}>Tela de Login</h1>
            <h2>Email:</h2>
            <input style={{height: 40, width: 500, alignItems: "center"}} 
             placeholder='Digite seu email' type='Text' onChange={(e) => setEmail(e.target.value)} value={email}/>
             <br/>
             <h2>Senha:</h2>
            <input style={{height: 40, width: 500, alignItems: "center"}} 
             placeholder='Digite sua senha' type='passaword' onChange={(e) => setSenha(e.target.value)} value={senha}/>
            <br/>
            <button onClick={botaoEntrar} type="submit" className="loginButton">Entrar</button>
            

        </div>
    )
}

const estilos = {
    loginButton:{
        width: 100,
        backgroundColor: "#ff006e",
        padding: 10,
        borderRadius: 4
    }
}

export default Login