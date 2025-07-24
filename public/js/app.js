var divProfessionalsTabContent = "#professional-tab-content"
var divServicesTabContent= "#services-tab-content"
var divCheckoutTabContent = "#checkout-tab-content"
var divDateTabContent = "#date-tab-content"

var divServicesContainer = "#service-list-container"
var divProfessionalContainer = "#professionals-container"
var divDatesContainer = "#dates-container"

var divTituloCard = "#tituloCard"
var divHorariosBarbeiros = "#horariosBarbeiro"
var divMsgSelecioneUmBarbeiro = "#msgSelecioneBarbeiro"

var divTabService = "#tab-services"
var divTabProfessionals = "#tab-professionals"
var divTabCheckout = "#tab-checkout"
var divTabDate = "#tab-date";

$(function(){
    init()
    loadContent()
})

const init = () => {
    handlerSelectTab(1)
    handlerUnselectTab(2)
    handlerUnselectTab(3)
    handlerUnselectTab(4)
    $('#exampleInputPassword1').mask('(00) 00000-0000')
    localStorage.clear()
}

const setProfessional = (id) => {
    handlerSelectTab(2)
    handlerUnselectTab(1)
    handlerUnselectTab(3)
    handlerUnselectTab(4)

    $(divTabProfessionals).on('click', function(){
        handlerSelectTab(1)
        handlerUnselectTab(2)
        handlerUnselectTab(3)
        handlerUnselectTab(4)
    })

    $(divTabService).on('click', function(){
        handlerSelectTab(2)
        handlerUnselectTab(1)
        handlerUnselectTab(3)
        handlerUnselectTab(4)
    })

    $(divTabService).css('cursor', 'pointer')
    $(divTabProfessionals).css('cursor', 'pointer')


    localStorage.setItem('professionalId', id)
}

const setService = (id) => {
    handlerSelectTab(3)
    handlerUnselectTab(1)
    handlerUnselectTab(2)
    handlerUnselectTab(4)

    $(divTabDate).on('click', function(){
        handlerSelectTab(3)
        handlerUnselectTab(1)
        handlerUnselectTab(2)
        handlerUnselectTab(4)

        $(divHorariosBarbeiros).show()
    })

    $(divTabDate).css('cursor', 'pointer')

    localStorage.setItem('serviceId', id)
}

const setDate = () => {
    $(divMsgSelecioneUmBarbeiro).hide()
    $(divHorariosBarbeiros).show()
}

const setHorario = () => {
    handlerSelectTab(4)

    handlerUnselectTab(1)
    handlerUnselectTab(2)
    handlerUnselectTab(3)

    $(divTabCheckout).on("click", function(){
        handlerSelectTab(4)

        handlerUnselectTab(1)
        handlerUnselectTab(2)
        handlerUnselectTab(3)
    })

    $(divTabCheckout).css("cursor", "pointer")
}

const loadContent = () => {
    $.get("/api/business/data", (res) => { 
        const services = res.services;
        const professionals = res.professionals;
        
        services.forEach(service => {
            let btnId = `btn-sv-${service.id}-set`

            $(divServicesContainer).append(`
                <div class="row">
                    <div class="col-2 d-flex justify-content-center align-items-center">
                        <img src="corte.jpg" height="64" width="64" class="rounded">
                    </div>
                    <div class="col-7 d-flex flex-column">
                        <div>
                            <strong>${service.name}</strong> - 30 min
                        </div>

                        <div class="scrollable-text">
                            ${service.description}
                        </div>
                    </div>
                    <div class="col-3 d-flex flex-column justify-content-center align-items-center">
                        <div>
                            <h6>${Number(service.price).toLocaleString('pt-BR', {
                                style: 'currency', 
                                currency: service.currency
                            })}</h6>
                        </div>
                        <div>
                            <button id=${btnId} class="btn btn-outline-dark">Agendar</button>
                        </div>
                    </div>
                </div>
                <hr/>
            `)

            $('#' + btnId).on('click', function (){
                setService(service.id)
            })
        });

        professionals.forEach(professional => {
            let btnId = `btn-${professional.id}-set`

            $(divProfessionalContainer).append(`
                <div class="row m-0 p-0">
                    <div class="col-1 d-flex justify-content-start align-items-center">
                        <img src="corte.jpg" height="64" width="64" class="rounded">
                        <div class="ms-2">
                            <strong>${professional.name}</strong>
                        </div>
                    </div>
                    <div class="col-11 d-flex justify-content-end align-items-center">
                        <div>
                            <button id=${btnId} class="btn btn-outline-dark">Escolher</button>
                        </div>
                    </div>
                </div>
                <hr/>
            `)

            $("#" + btnId).on('click', function() {
                setProfessional(professional.id)
            })
        })

        for(let i = 0; i <= 9; i++){
            let idElement = 'date-element-' + i;

            $(divDatesContainer).append(`
                    <div style="min-width: 80px; cursor: pointer;">
                        <div id=${idElement} class="border rounded p-2">
                            <div class="w-100 d-flex text-center justify-content-center flex-column"
                                style="min-height: 40px;">
                                <span>Qui</span>
                                <span class="fw-bold">24</span>
                                <span class="fw-bold">Julho</span>
                            </div>
                        </div>
                    </div>
                `)

            $('#' + idElement).on('click', function(){
                setDate()
                resetSelectedDate()

                $('#' + idElement).addClass('border-dark')
            })
        }
    })
}

const resetSelectedDate = () => {
    $('.border-dark').removeClass('border-dark')
}

const handlerSelectTab = (tabId) => {
    let div = getDivTab(tabId)
    
    $(div).removeClass('bg-dark')
    $(div).addClass('bg-white')
    $(div).addClass('text-dark')
    $(div).removeClass('text-light')

    switch(tabId) {
        case 1:
            $(divProfessionalsTabContent).show()

            $(divServicesTabContent).hide()
            $(divHorariosBarbeiros).hide()
            $(divCheckoutTabContent).hide()
            $(divDateTabContent).hide()
            break;
        case 2:
            $(divServicesTabContent).show()

            $(divProfessionalsTabContent).hide()
            $(divCheckoutTabContent).hide()
            $(divHorariosBarbeiros).hide()
            $(divDateTabContent).hide()
            break;
        case 3:
            $(divDateTabContent).show()
            
            $(divProfessionalsTabContent).hide()
            $(divCheckoutTabContent).hide()
            $(divServicesTabContent).hide()
            break;
        case 4:
            $(divCheckoutTabContent).show()

            $(divDateTabContent).hide()
            $(divProfessionalsTabContent).hide()
            $(divHorariosBarbeiros).hide()
            $(divServicesTabContent).hide()
    }
}

const handlerUnselectTab = (tabId) => {
    let div = getDivTab(tabId)

    $(div).addClass('bg-dark')
    $(div).removeClass('bg-white')
    $(div).removeClass('text-dark')
    $(div).addClass('text-light')
}

const getDivTab = (tabId) => {
    switch(tabId) {
        case 1:
            return divTabProfessionals;
        case 2:
            return divTabService;
        case 3:
            return divTabDate;
        case 4:
            return divTabCheckout;
        default:
            return '';
    }
}