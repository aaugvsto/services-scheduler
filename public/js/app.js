var divSelecionarBarbeiro = "#selecionar-barbeiro"
var divSelecionarServico = "#selecionar-servico"
var divTituloCard = "#tituloCard"
var divHorariosBarbeiros = "#horariosBarbeiro"
var divMsgSelecioneUmBarbeiro = "#msgSelecioneBarbeiro"

$(function(){
    init()
})

const init = () => {
    $(divTituloCard).html('Selecione seu serviço <i class="bi bi-scissors"></i>')
    $(divSelecionarServico).show()
    $(divSelecionarBarbeiro).hide()
    $(divHorariosBarbeiros).hide()
    $('#exampleInputPassword1').mask('(00) 00000-0000')
}

const selecionarBarbeiro = () => {
    $(divTituloCard).html('Selecione seu professional <i class="bi bi-scissors"></i>')
    $(divSelecionarServico).hide()
    $(divSelecionarBarbeiro).show()
    $(divHorariosBarbeiros).hide()
    $(divMsgSelecioneUmBarbeiro).show()
}

const showHorarioBarbeiro = (element) => {
    $('.border-primary').removeClass('border-primary');
    $(element).addClass('border-primary')
    $(divHorariosBarbeiros).show()
    $(divMsgSelecioneUmBarbeiro).hide()
}




