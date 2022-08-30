
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
        
    } else {
        //dialog erro
        modalNegativo()
        $('#modalRegistraDespesa').modal('show')
        
    }
    
}
botaoCadastro.addEventListener('click', cadastrarDespesa)


/**------------------------------ */


//! 