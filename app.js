class Despesa
{
    constructor(ano, mes, dia, tipo, descricao, valor)
    {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor 
    }

    validarDados() 
    {
        for(let i in this)  //this faz referencia aprópria despesa
        {
           //console.log(i, this[i]) this[i] retoma todos os atributos
           if(this[i] == undefined || this[i] == '' || this[i] == null)
            {
                return false
            }
        }
        return true
    }
}

class Bd
{
    constructor() 
    {
        let id = localStorage.getItem('id')

        if (id === null) 
        {
            //inicia um valor para id, caso este não exista, isto é 0
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() 
    {
        let proximoId = localStorage.getItem('id') //null
        return parseInt(proximoId) + 1
    }

    gravar(d) // d é literal
    {
        let id = this.getProximoId()

        //JSON.stringify --> converte obj literal em JSON
        localStorage.setItem(id, JSON.stringify(d))
        //obs: setItem sobrepoe valores existentes quando se adiciona novos cadastros

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() //pagina de consulta
    {
        //array de despesas
        let despesas = Array()
        
        let id = localStorage.getItem('id')

        //recupear todas as depesas cadastradas em localStorage
        for (let i = 1; i <= 4; i++)
        {
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i)); //JSON.parse converte para objeto literal
            
            //teste - console.log(i, despesa)
            //existe a possibilidade de have indices que foram pulados/removidos
            //pular os indices neste caso
            if (despesa === null)
            {
                continue;
            }   
            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa)
    {
        //console.log(despesa)
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros
        console.log(despesasFiltradas)
        console.log(despesa)

        //ano
        if (despesa.ano != '')
        {
            console.log("filtro de ano")
            despesasFiltradas = depesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //mes
        if (despesa.mes != '')
        {
            console.log("filtro de mes")
            despesasFiltradas = depesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia
        if (despesa.dia != '')
        {
            console.log("filtro de dia")
            despesasFiltradas = depesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo
        if (despesa.tipo != '')
        {
            console.log("filtro de tipo")
            despesasFiltradas = depesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //descricao
        if (despesa.descricao != '')
        {
            console.log("filtro de descricao")
            despesasFiltradas = depesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor
        if (despesa.valor != '')
        {
            console.log("filtro de valor")
            despesasFiltradas = depesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }
}

let bd = new Bd()

function cadastrarDespesa() 
{
    let ano =  document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    /* formas de recuperar os valores dos elementos */
    //let mes = document.getElementById('mes).value
    //console.log(mes)
    //console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value) /* melhor usar essa */

    let despesa = new Despesa
    (
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )
    
    if(despesa.validarDados()) 
    {
        //console.log('dados validos')
        bd.gravar(despesa)
        
        
       
         //$('#sucessoGravacao').modal('show')
        document.getElementById('modal_titulo_div').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'

        //dialog de sucesso
        $('#modalRegistraDespesa').modal('show')

        //Apagar os dados depois de inscreve-los
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } 
    else
    {
        
        //console.log('dados invalidos')

        //$('#erroGravacao').modal('show')
        document.getElementById('modal_titulo_div').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        //dialog de erro
        $('#modalRegistraDespesa').modal('show')
    }
    
}






function carregaListaDespesas(despesas = Array(), filtro = false)
{
    if (despesas.length == 0 && filtro == false)
    {
        despesas = bd.recuperarTodosRegistros()
    }
  
    //carregamento propriamente dito
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    //percorrer o aray despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d) //d sao os valores
    {
        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}${d.ano}`  
       
        //ajustar o tipo
        switch(d.tipo)
        {
            case '1': d.tipo = 'Alimentação' 
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //criar o botão de exclusão
        let betn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fa fa-times" ></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function()
        {
            let id = this.id.replace('id_despesa', '')
            //alert(id)
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
        console.log(d)
    })
}

function pesquisarDespesa()
{
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    this.carregaListaDespesas
}