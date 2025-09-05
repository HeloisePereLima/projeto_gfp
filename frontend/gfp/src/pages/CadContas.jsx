import React, { useState, useEffect, useContext } from 'react'
import { UsuarioContext } from '../UsuarioConxtext'
import { enderecoServidor } from '../utils'
import { MdCreditCard, MdSave, MdClose } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'
import Estilos from "../styles/Estilos"


export default function CadContas() {
    const { dadosUsuario } = useContext(UsuarioContext)
    const navigate = useNavigate();
    const location = useLocation();

    const [nome, setNome] = useState('')
    const [tipoConta, setTipoConta] = useState('CONTA_CORRENTE')
    const [saldoInicial, setSaldoInicial] = useState(0)

    const itemAlterar = location.state?.itemAlterar || null ;

    useEffect( () => {
        if (itemAlterar){
            setNome(itemAlterar.nome)
            setTipoConta(itemAlterar.tipo_conta)
            setSaldoInicial(itemAlterar.saldo)
        }
    }, [itemAlterar])

    const botaoSalvar = async () => {
        if (nome.trim() == '') {
            alert('Informe o nome da conta')
            return
        }
        const dados = {
            nome: nome,
            tipo_conta: tipoConta,
            saldo: parseFloat(saldoInicial) || 0,
            ativo: true
        }
        try {
            let endpoint = `${enderecoServidor}/contas`
            let metodo = 'POST'

            if (itemAlterar) {
                endpoint = `${enderecoServidor}/contas/${itemAlterar.id_conta}`
                metodo = 'PUT'
            }

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${dadosUsuario.token}`
                },
                body: JSON.stringify(dados)
            })

            if (resposta.ok) {
                alert('Conta cadastrada com sucesso!')
                navigate('/contas')
            }

        } catch (error) {
            alert('Erro ao salvar conta: ' + error.message)
            console.error('Erro ao salvar conta: ', error.message)
        }
    }

    return (
        <div className='flex justify-center py-6 px-4'>
            <section className='w-full max-w-lg bg-white p-8 rounded-lg shadow-lg text-gray-800'>
                {/* cabeçalho  */}
                <header className='flex items-center gap-2 mb-6 border-b border-gray-200  pb-4'>
                    <MdCreditCard className='text-cyan-600 h-8 w-8' />
                    <h2 className='text-2x1 font-bold'>
                        {itemAlterar ? 'Editar Conta' : 'Nova Conta'}
                    </h2>
                </header>
                {/* Formulario de cadastro */}
                <div className='space-y-5'>
                    <label className={Estilos.labelCadastro}>Nome da Conta</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}
                        placeholder='Ex: Carteira' className={Estilos.inputCadastro} />
                    <label className={Estilos.labelCadastro}>Tipo da Conta</label>
                    <select value={tipoConta} onChange={(e) => setTipoConta(e.target.value)}
                        className={Estilos.inputCadastro}>
                        <option value="CONTA_CORRENTE">Conta Corrente</option>
                        <option value="POUPANÇA">Poupança</option>
                        <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                        <option value="CARTAO_DEBITO">Cartão de Débito</option>
                        <option value="DINHEIRO">Dinheiro</option>
                        <option value="INVESTIMENTO">Investimento</option>
                    </select>
                    <label className={Estilos.labelCadastro}>Saldo Inicial</label>
                    <input type="number" value={saldoInicial}
                        onChange={(e) => setSaldoInicial(e.target.value)}
                        className={Estilos.inputCadastro} />
                    {/* Botões de controle */}
                    <div className='flex justify-end gap-3 mt-8'>
                        <button className={Estilos.botaoOutline} onClick={() => navigate('/contas')}>
                            <MdClose />Cancelar
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}