
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

    //Gera proximo id com base no número do anterior
    getProximoId () {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    //Grava o Id gerado
    gravar (d) {
        
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    //Recupera todos os registros cadastrados e armazenados no localStorage
    recuperarTodosRegistros () {

        //array despesas

        let despesas = Array()


        let id = localStorage.getItem('id')

        //lógica para recuperar todas as despesas do localStorage e id
        for (let i = 1; i <= id; i++) {
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))


            //existe a possibilidade de haver indices que foram pulados ou removidos
            //nesse caso pular o indice
            if(despesa === null) {
                continue
            }

            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    //Método para filtro das despesas
    pesquisar(despesa) {

        let despesasFiltradas = Array()
        despesasFiltradas =  this.recuperarTodosRegistros()

        //console.log(despesasFiltradas)
        //console.log(despesa)
        

        // Aplicar filtros / ano,mes,dia etc

        // ANO
        if(despesa.ano != '') {
            //console.log('Filtro Ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        
        // MES
        if(despesa.mes != '') {
            //console.log('Filtro Mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //console.log(despesasFiltradas)

        // DIA
        if(despesa.dia != '') {
            //console.log('Filtro Dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //console.log(despesasFiltradas)

        // TIPO
        if(despesa.tipo != '') {
            //console.log('Filtro Tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //console.log(despesasFiltradas)

        // DESCRICAO
        if(despesa.descricao != '') {
            //console.log('Filtro Descrição')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //console.log(despesasFiltradas)

        // VALOR
        if(despesa.valor != '') {
            //console.log('Filtro Valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    // Método que remove a despesa com base no id  
    remover(id) {
        localStorage.removeItem(id)  
    }
}

//Criando Banco de Dados com base na classe
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


function modalExcluirDespesa() {
    tituloModal.innerText = 'Despesa excluída com Sucesso'
    textoModal.innerText = 'Seu registro de despesa foi excluído com sucesso!'
    divModal.classList.remove('text-danger')
    divModal.classList.add('text-success')
    botaoModal.classList.remove('btn-danger')
    botaoModal.classList.add('btn-success')
}

/**------------------------------ */





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
        //! Limpar os inputs Após validação positiva da despesa
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

//Capta evento de click para cadastrar a despesa
botaoCadastro.addEventListener('click', cadastrarDespesa);


/**------------------------------ */


//! Carregar Lista das Despesas


// const bodyConsulta = document.getElementById('bodyConsulta')


function carregarListaDespesas (despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()
    }

    


    // selecionado o elemento tbody da tabela
    let listaDepesas = document.getElementById('listaDespesas')
    listaDepesas.innerHTML = ''



    /**  EXEMPLO DO HTML QUE SERA CRIADO SISTEMATICAMENTE COM JS
            <tr>
                <td>15/03/2018</td>
                <td>Alimentação</td>
                <td>Comprar do mês</td>
                <td>444.75</td>
            </tr> 
    */




    //percorrer array despesas listando casa DESPESA dinamicamente
    despesas.forEach(function(d) {
        // console.log(d)


        //criando do <TR>
        let linha = listaDepesas.insertRow()

        //inserir as colunas <TD>
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        

        //ajusta o tipo (de id para decrição do tipo)

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

        // criar o botao de excluir 
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`

        //Função para remover a despesa
        btn.onclick = function () {

            //remover string e deixar apenas o ID
            let id = this.id.replace('id_despesa_', '')
        
            //Remove a despesa da página de consulta
            bd.remover(id)

            //Recarrega a página automáticamente para atualizar os dados no localStorage 
            //E atualizar a lista de despesas que serão mostradas na tabela
            window.location.reload()
        }

        //inserindo o botão na tabela
        linha.insertCell(4).append(btn)

        

        //console.log(d)
    })
}

/**------------------------------ */

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
    
    let despesas = bd.pesquisar(despesa)

    this.carregarListaDespesas(despesas, true)
    
    
}

