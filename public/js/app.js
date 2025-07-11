var divSelecionarBarbeiro = "#selecionar-barbeiro"
var divSelecionarServico = "#selecionar-servico"
var divTituloCard = "#tituloCard"
var divHorariosBarbeiros = "#horariosBarbeiro"
var divMsgSelecioneUmBarbeiro = "#msgSelecioneBarbeiro"

$(function(){
    init()
})

const init = () => {
    $(divTituloCard).html('Escolha seu serviço')

    $(divSelecionarServico).show()
    $(divSelecionarBarbeiro).hide()
    $(divHorariosBarbeiros).hide()

    $('#exampleInputPassword1').mask('(00) 00000-0000')

    resetProfessionalBorder()
}

const selecionarServico = () => {
    $(divTituloCard).html('Escolha seu professional')
    $(divSelecionarServico).hide()
    $(divSelecionarBarbeiro).show()
    $(divHorariosBarbeiros).hide()
    $(divMsgSelecioneUmBarbeiro).show()
}

const selectProfessional = (element) => {
    resetProfessionalBorder();
    setProfessional(element)

    $(divHorariosBarbeiros).show()
    $(divMsgSelecioneUmBarbeiro).hide()
}

const setProfessional = (element) => {
    $(element).addClass('border-dark')
    $(element).addClass('border-2')
}

const resetProfessionalBorder = () => {
    $('.border-dark').removeClass('border-dark');
}