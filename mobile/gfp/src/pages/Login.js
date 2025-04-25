import React, {useState} from "react";
import { enderecoServidor } from '../utils';
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    
    async function botaoEntrar(){
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
                AsyncStorage.setItem('UsuarioLogado', JSON.stringify(dados))
                navigation.navigate('MenuDrawer')
            }else {
                throw new Error('Email ou senha incoretos ❌')
            }
        } catch (error) {
            console.error('Erro ao realizar login', error)
            alert(error.message)
        }
      }

      return(
      <View style={styles.conteudoHeader}>
        
          <Image source={require('../assets/logo.png')}
                  style={styles.logo}
                  resizeMode="contain" />
          <Text style={styles.headerText}>GFP </Text>
          <Text style={styles.headerText}>Gestor Financeiro Pessoal </Text>

             <View style={styles.conteudoCorpo}>
                <Text style={styles.texto}>Acesse sua conta</Text>
            <br/>

          <TextInput 
              placeholder="Email" 
              style={styles.inputLogin} 
              onChangeText={setEmail}
              value={email}
              />
              <br/>
              
          
          <TextInput 
              placeholder="Senha" 
              style={styles.inputLogin} 
              secureTextEntry={true} 
              onChangeText={setSenha}
              value={senha}
              />
          <TouchableOpacity style={styles.botao}
              onPress={botaoEntrar}>
              <Text style={styles.textoBotao}> Entrar </Text>
          </TouchableOpacity>
      </View>
  </View>
 )
}

export default Login


const corPrincipal = '#b8c0ff'
const corBranco = '#fff'


const styles = StyleSheet.create({
conteudoHeader: {
  flex: 1,
  backgroundColor: corPrincipal,
  justifyContent:"center",
  display:"flex"
},
header: {
  flex: 1,
  marginTop: '14%',
  marginBottom: '8%',
  paddingStart: '5%',
  flexDirection: 'row'
},
headerText: {
  fontSize: 28,
  fontWeight: 'bold',
  color: corBranco,

},
conteudoCorpo: {
  //flex: 2,
  backgroundColor: corBranco,
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  paddingHorizontal: '5%',
  paddingVertical:'5%',
  paddingTop: '2%',
  width: 800,
  height: 500,
  justifyContent: "center",
  display:"flex"

},
logo : {
  width: 100, 
  height: 100, 
  marginRight: 20
},
label: {
  fontSize: 20,
  marginTop: 28
},
texto: {
  fontSize: 20,
  marginTop: 28,
  color:"#00000",
  textAlign:"center"
},
inputLogin: {
  borderBottomWidth: 1,
  height: 40,
  fontSize: 16,
  border: "solid",
  borderRadius:6
},
botao: {
  backgroundColor: corPrincipal,
  borderRadius: 10,
  paddingVertical: 8,
  width: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 40,
  borderColor: corBranco,
  borderWidth: 2,
  textAlign:"center",
  display: "flex"
},
textoBotao: {
  fontSize: 18,
  color: corBranco,
  fontWeight: 'bold',
},
})
