import { BD } from "../db.js"

class rotasTransacoes{
    static async NovaTransacao(req, res){
        const {valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
            id_conta, id_categoria, id_usuario, id_subcategoria } = req.body
        
    try{
        const transacoes = await BD.query(`
            INSERT INTO transacoes(valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
            id_conta, id_categoria, id_usuario, id_subcategoria )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, [valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
                id_conta, id_categoria, id_usuario, id_subcategoria ])
        res.status(201).json('contas cadastradas')
    }catch(error){
        console.error('erro ao criar contas', error)
        res.status(500).json({message: 'Erro ao criar transacoes', error: error.message})   
     }
    }
    static async atualizarTodos(req, res){
        const {id} = req.params
        const {valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
            id_conta, id_categoria, id_usuario, id_subcategoria } = req.body

        try{
            const Transacoes = await BD.query(`
                UPTADE transacoes SET valor = $1, descricao = $2, data_transacao = $3, data_vencimento = $4,
                 data_pagamento =  $5, tipo_transacao= $6, num_parcelas =$7, parcela_atual = $8,
            id_conta = $9, id_categoria = $10, id_usuario = $11, id_subcategoria = $12)`
            [valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
                id_conta, id_categoria, id_usuario, id_subcategoria,  id])

            res.status(201).json('transacoes atualizadas')
        }catch(error){
            res.status(500).json({message: 'Erro ao criar transacoes', error: error.message})
        }
    }

    static async deletar (req, res){
        const {id} = req.params
        try{
            const transacao = await BD.query(`UPDATE transacoes SET ativo = false WHERE id_transacao = $1`, [id] )
            return res.status(200).json({message: "transacao desativada com sucesso"})
        }catch(error){
            res.status(500).json({message: "Erro ao deletar transacao", error: error.message}) 
        }
    }

    static async listar (req, res){
        try{
         const transacao = await BD.query('SELECT * FROM transacoes ')
             res.status(200).json(transacao.rows);
        }catch(error){
             res.status(500).json({message: 'Erro ao listar as transacoes', error: error.message})
        }
     }

     static async listarPorId(req, res){
        const {id} = req.params
        try{
            const transacao = await BD.query('SELECT * FROM transacoes WHERE id_transacao = $1', [id])
            res.status(200).json(transacao.rows)
        }catch(error){
            res.status(500).json({message: 'Erro ao listar as transacoes por id', error: error.message})
        }
    }
    static async atualizar(req, res) {
    const {id} = req.params
    const {valor, descricao, data_transacao, data_vencimento, data_pagamento, tipo_transacao, num_parcelas, parcela_atual,
            id_conta, id_categoria, id_usuario, id_subcategoria} = req.body;

    try{
        const campos = [];
        const valores = [];

      if(valor !== undefined){
        campos.push(`nome = $${valores.length + 1 }`) 
        valores.push(nome);
    }

    if(descricao!== undefined){
        campos.push(`descricao = $${valores.length + 1 }`)
        valores.push(descricao);
    }

    if(data_transacao !== undefined){
        campos.push(`data_transacao = $${valores.length + 1 }`)
        valores.push(data_transacao);
    }
    if(data_vencimento !== undefined){
        campos.push(`data_vencimento = $${valores.length + 1 }`)
        valores.push(data_vencimento);
    }
    if(data_pagamento !== undefined){
        campos.push(`data_pagamento = $${valores.length + 1 }`)
        valores.push(data_pagamento);
    }
    if(tipo_transacao !== undefined){
        campos.push(`tipo_transacao = $${valores.length + 1 }`)
        valores.push(tipo_transacao);
    }
    if(num_parcelas !== undefined){
        campos.push(`num_parcelas = $${valores.length + 1 }`)
        valores.push(num_parcelas);
    }
    if(parcela_atual !== undefined){
        campos.push(`parcela_atual = $${valores.length + 1 }`)
        valores.push(parcela_atual);
    }
    if(id_conta !== undefined){
        campos.push(`id_categoria = $${valores.length + 1 }`)
        valores.push(id_categoria);
    }
    if(id_usuario !== undefined){
        campos.push(`id_usuario = $${valores.length + 1 }`)
        valores.push(id_usuario);
    }
    if(id_subcategoria !== undefined){
        campos.push(`id_subcategoria = $${valores.length + 1 }`)
        valores.push(id_subcategoria);
    }

    if(campos.length === 0 ){
        console.log('1')
        return res.status(400).json({message: 'Nenhum campo fornecido para atualizar'})
       
    }
    
    const query = `UPDATE trancacoes SET ${campos.join(", ")} WHERE id_trancacoes = ${id} RETURNING *`
    const subCategoria = await BD.query(query, valores)

    if (subCategoria.rows.length === 0) {
        console.log('2')
        return res.status(401).json({message: "transacoes não encontrada"})
    }
    return res.status(200).json({message: "transacoes atualizada"})
    }catch(error){
        console.log('3')
        res.status(500).json({message: 'Erro ao listar as transacoes por Id', error: error.message})
    }
    }
    //criar uma rota que permite filtrar transaçoes por data de vencimento ou data de pagamento
    //dentro de um intervalo específico 


    static async filtrarPorData(req, res){
  const { data_inicio, data_fim, tipo_data } = req.query;

  let colunaData;
  if(tipo_data == 'vencimento'){
    colunaData = 'data_vencimento'
  }
  else if(tipo_data == 'pagamento'){
    colunaData = 'data_pagamento'
  }
  else{
    return res.status(400).json({
      message: "Tipo_data inválido, use vencimento ou pagamento"
    })
  }
  try{
    const query = `
            SELECT t.*, u.nome AS nome_usuario, ct.nome
            FROM transacoes AS t
            LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario
            LEFT JOIN contas ct ON t.id_conta = ct.id_conta
            WHERE ${colunaData} BETWEEN $1 AND $2
            ORDER BY ${colunaData} ASC
    `

    const transacoes = await BD.query(query, [data_inicio, data_fim])

    res.status(200).json(transacoes.rows);
  }catch(error){
    console.error("Erro ao filtrar transação:", error);
    res.status(500).json({ message: "Erro ao filtrar transação", error: error.message });
  }
}

//somando transacoes entrada ou saida
    static async somarTransacoes(req, res) {
        const { tipo, id_usuario} = req.query
        try{
            const tipoTransacao = tipo.toUpperCase()

            const query = `
                    SELECT SUM(valor) AS total
                    FROM transacoes WHERE tipo_transacao = $1 AND id_usuario = $2
                `
            const resultado  = await BD.query(query, [tipoTransacao, id_usuario])

            let total = resultado.rows[0].total
            if(total === null)
            {
                total = 0 
            }
            res.status(200).json({total: parseFloat(total)})
        }catch(error){
            console.error("Erro ao somar transação:", error);
            res.status(500).json({ message: "Erro ao somar transação", error: error.message });
        }
    }

    static async transacoesVencidas (req, res){
        const { id_usuario } = req.params;

        try{
            const query = `
                    SELECT t.valor, t.data_transacao, t.data_vencimento, t.data_Pagamento, 
                    u.nome AS nome_usuario, 
                    c.nome AS nome_conta, 
                    ct.nome AS nome_categoria, 
                    sct.nome AS nome_subcategoria
                    FROM transacoes AS t
                    LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario
                    JOIN contas c ON t.id_conta = c.id_conta
                    JOIN categorias ct ON t.id_categoria = ct.id_categoria
                    JOIN subcategorias sct ON t.id_subcategoria = sct.id_subcategoria
                    WHERE t.data_vencimento < CURRENT_DATE   --filtra transacoes vencidas
                    AND t.id_usuario = $1
                    ORDER BY t.data_vencimento ASC
                `
                const resultado = await BD.query(query, [id_usuario])


                //Funcao para formatar DATA 
                const formatarDataBr = (data) =>{
                    if(!data) return null;
                    return new Date(data).toLocaleDateString('pt-BR') //converte a data no padrao BR
                }
                const dadosFormatados = resultado.rows.map(t =>({
                    ...t, //copia todas as propriedades originais da resultado para a t
                    data_transacao: formatarDataBr(t.data_transacao),
                    data_vencimento: formatarDataBr(t.data_vencimento),
                    data_pagamento: formatarDataBr(t.data_pagamento),
                }))
                res.status(200).json(dadosFormatados)
        }catch(error){
            console.error("Erro ao buscar transação vencidas:", error);
            res.status(500).json({ message: "Erro ao buscar transação vencidas", error: error.message });
        }
    }
}

export default rotasTransacoes