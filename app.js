
//! Classe Despesa
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao 
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}


/**------------------------------ */


//! Classe para Banco de Dados e criação do id para cadastrar despesa
class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId () {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar (d) {
        
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }


    recuperarTodosRegistros () {

        //array despesas

        let despesas = Array()


        let id = localStorage.getItem('id')

        //recuperar todas as despesas do localStorage
        for (let i = 1; i <= id; i++) {
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))


            //existe a possibilidade de haver indices que foram pulados ou removidos
            //nesse caso pular o indice
            if(despesa === null) {
                continue
            }


            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {
        console.log(despesa)
    }
}

let bd = new Bd()


/**------------------------------ */



//! Função que controla o estilo do modal de acordo com validação positiva / negativa
const modal = document.getElementById('modalRegistroDespesa')
const tituloModal = document.getElementById('exampleModalLabel')
const divModal = document.getElementById('divTituloModal')
const textoModal = document.getElementById('textoModal')
const botaoModal = document.getElementById('botaoModal')


function modalPositivo() {
    tituloModal.innerText = 'Registro incluido com sucesso'
    textoModal.innerText = 'Sucesso na gravação, a despesa foi cadastrada com sucesso!'
    divModal.classList.remove('text-danger')
    divModal.classList.add('text-success')
    botaoModal.classList.remove('btn-danger')
    botaoModal.classList.add('btn-success')
}


function modalNegativo() {
    tituloModal.innerText = 'Erro na inclusão do registro'
    textoModal.innerText = 'Erro na gravação, existem campos obrigatórios que não foram preenchidos corretamente!'
    divModal.classList.remove('text-success')
    divModal.classList.add('text-danger')
    botaoModal.classList.remove('btn-success')
    botaoModal.classList.add('btn-danger')
}


/**------------------------------ */


//! Função Limpar os inputs Após validação positiva da despesa


//! Função Cadastar despesa
const botaoCadastro = document.getElementById('cad-but')
function cadastrarDespesa () {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')


    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    if(despesa.validarDados()) {
        bd.gravar(despesa)
        //dialog de sucesso
        modalPositivo()
        $('#modalRegistraDespesa').modal('show')
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
   
    } else {
        //dialog erro
        modalNegativo()
        $('#modalRegistraDespesa').modal('show')
        
    }
    
}
botaoCadastro.addEventListener('click', cadastrarDespesa);


/**------------------------------ */


//! Carregar Lista das Despesas


// const bodyConsulta = document.getElementById('bodyConsulta')


function carregarListaDespesas () {

    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()


    // selecionado o elenmento tbody da tabela
    let listaDepesas = document.getElementById('listaDespesas')



    /**
            <tr>
                <td>15/03/2018</td>
                <td>Alimentação</td>
                <td>Comprar do mês</td>
                <td>444.75</td>
            </tr> 
    */




    //percorrer despesas listando DESPESA dinamicamente
    despesas.forEach(function(d) {
        // console.log(d)


        //criando do <TR>
        let linha = listaDepesas.insertRow()

        //inserir as colunas <TD>
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        

        //ajusta o tipo

        switch(parseInt(d.tipo)) {
            case 1 : d.tipo = 'Alimentação'
                break
            case 2 : d.tipo = 'Educação'
                break
            case 3 : d.tipo = 'Lazer'
                break
            case 4 : d.tipo = 'Saúde'
                break
            case 5 : d.tipo = 'Transporte'
                break
        
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}



//! Função pesquisar as despeas (filtro)
// const botaoPesquisa = document.getElementById('btnPesquisa')
function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    

    bd.pesquisar(despesa)
}

