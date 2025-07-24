var divProfessionalsTabContent = "#professional-tab-content"
var divServicesTabContent= "#services-tab-content"
var divCheckoutTabContent = "#checkout-tab-content"
var divServicesContainer = "#service-list-container"
var divProfessionalContainer = "#professionals-container"
var divTituloCard = "#tituloCard"
var divHorariosBarbeiros = "#horariosBarbeiro"
var divMsgSelecioneUmBarbeiro = "#msgSelecioneBarbeiro"
var divTabService = "#tab-services"
var divTabProfessionals = "#tab-professionals"
var divTabCheckout = "#tab-checkout"

$(function(){
    init()
    loadContent()
})

const init = () => {
    handlerSelectTab(1);

    $('#exampleInputPassword1').mask('(00) 00000-0000')

    resetProfessionalBorder()
}

const setService = (id) => {
    handlerSelectTab(2)
    handlerUnselectTab(1)

    $(divTabService).on('click', function () {
        handlerSelectTab(1)
        handlerUnselectTab(2)
        handlerUnselectTab(3)
    })

    $(divTabProfessionals).on('click', function () {
        handlerSelectTab(2)
        handlerUnselectTab(1)
        handlerUnselectTab(3)
    })


    $(divTabService).css("cursor", "pointer")
    $(divTabProfessionals).css("cursor", "pointer")

    localStorage.setItem('serviceId', id)
}

const selectProfessional = (element, id) => {
    resetProfessionalBorder();
    setProfessional(element)

    $(divHorariosBarbeiros).show()
    $(divMsgSelecioneUmBarbeiro).hide()

    localStorage.setItem('professionalId', id)
}

const setProfessional = (element) => {
    $(element).addClass('border-dark')
    $(element).addClass('border-2')
}

const setHorario = () => {
    handlerSelectTab(3)
    handlerUnselectTab(2)

    $(divTabCheckout).on("click", function(){
        handlerSelectTab(3)
        handlerUnselectTab(2)
        handlerUnselectTab(1)
    })

    $(divTabCheckout).css("cursor", "pointer")
}

const resetProfessionalBorder = () => {
    $('.border-dark').removeClass('border-dark');
}

const loadContent = () => {
    $.get("/api/business/data", (res) => { 
        const services = res.services;
        const professionals = res.professionals;
        
        services.forEach(service => {
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
                            <button class="btn btn-outline-dark" onclick="setService(${service.id})">Agendar</button>
                        </div>
                    </div>
                </div>
                <hr/>
            `)
        });

        professionals.forEach(professional => {
            $(divProfessionalContainer).append(`
                <div class="me-1" style="min-width: 80px; cursor: pointer;">
                    <div class="d-flex flex-column border rounded p-2" onclick="selectProfessional(this, ${professional.id})">
                        <div>
                            <img src="corte.jpg" height="64" width="64" class="rounded-circle">
                        </div>
                        <div class="w-100 text-center">
                            <span class="fw-bold">${professional.name}</span>
                        </div>
                    </div>
                </div>
            `)
        })
    })
}

const handlerSelectTab = (tabId) => {
    let div = getDivTab(tabId)
    
    $(div).removeClass('bg-dark')
    $(div).addClass('bg-light')
    $(div).addClass('text-dark')
    $(div).removeClass('text-light')

    switch(tabId) {
        case 1:
            $(divServicesTabContent).show()
            $(divProfessionalsTabContent).hide()
            $(divHorariosBarbeiros).hide()
            $(divCheckoutTabContent).hide()
            break;
        case 2:
            $(divServicesTabContent).hide()
            $(divProfessionalsTabContent).show()
            $(divCheckoutTabContent).hide()
            $(divHorariosBarbeiros).hide()

            hasSelectedBarber = localStorage.getItem('professionalId')
            if(hasSelectedBarber){
                $(divHorariosBarbeiros).show()
            }

            break;
        case 3:
            $(divServicesTabContent).hide()
            $(divProfessionalsTabContent).hide()
            $(divHorariosBarbeiros).hide()
            $(divMsgSelecioneUmBarbeiro).hide()
            $(divCheckoutTabContent).show()
            break;
    }
}

const handlerUnselectTab = (tabId) => {
    let div = getDivTab(tabId)

    $(div).addClass('bg-dark')
    $(div).removeClass('bg-light')
    $(div).removeClass('text-dark')
    $(div).addClass('text-light')
}

const getDivTab = (tabId) => {
    switch(tabId) {
        case 1:
            return divTabService;
        case 2:
            return divTabProfessionals;
        case 3:
            return divTabCheckout;
        default:
            return '';
    }
}