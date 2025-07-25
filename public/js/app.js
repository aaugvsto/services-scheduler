const divProfessionalsTabContent = "#professional-tab-content"
const divServicesTabContent= "#services-tab-content"
const divCheckoutTabContent = "#checkout-tab-content"
const divDateTabContent = "#date-tab-content"

const divServicesContainer = "#service-list-container"
const divProfessionalContainer = "#professionals-container"
const divDatesContainer = "#dates-container"

const divTituloCard = "#tituloCard"
const divHorariosBarbeiros = "#horarios"
const divMsgSelecioneUmBarbeiro = "#msgSelecioneBarbeiro"

const divTabService = "#tab-services"
const divTabProfessionals = "#tab-professionals"
const divTabCheckout = "#tab-checkout"
const divTabDate = "#tab-date";

const divCheckoutProfessionalName = "#professional-name"
const divCheckoutDate = "#schedule-date"
const divCheckoutServices = "#services"
const divCheckouTotalValue = "#total-value"

$(function(){
    init()
    loadContent()
})

const init = () => {
    handlerSelectTab(1)
    handlerUnselectTab(2)
    handlerUnselectTab(3)
    handlerUnselectTab(4)
    
    resetTabClick(1)
    resetTabClick(2)
    resetTabClick(3)
    resetTabClick(4)

    $('#iptWppPhone').mask('(00) 00000-0000')

    sessionStorage.clear()
}

const setProfessional = (professional) => {
    sessionStorage.clear()
    resetSelectedDate()
    $(divMsgSelecioneUmBarbeiro).show()

    sessionStorage.setItem('professional.code', professional.id)
    sessionStorage.setItem('professional.name', professional.name)

    handlerSelectTab(2)
    handlerUnselectTab(1)
    handlerUnselectTab(3)
    handlerUnselectTab(4)

    resetTabClick(3)
    resetTabClick(4)

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
}

const setService = (service) => {
    sessionStorage.setItem('service.code', service.id)
    sessionStorage.setItem('service.name', service.name)
    sessionStorage.setItem('service.price', service.price)
    sessionStorage.setItem('service.currency', service.currency)

    handlerSelectTab(3)
    handlerUnselectTab(1)
    handlerUnselectTab(2)
    handlerUnselectTab(4)

    resetTabClick(4)

    $(divTabDate).on('click', function(){
        handlerSelectTab(3)
        handlerUnselectTab(1)
        handlerUnselectTab(2)
        handlerUnselectTab(4)

        if(sessionStorage.getItem('schedule.day')){
            $(divHorariosBarbeiros).show()
            return
        }

        $(divHorariosBarbeiros).hide()
    })

    $(divTabDate).css('cursor', 'pointer')
}

const setDate = (date) => {
    $(divMsgSelecioneUmBarbeiro).hide()
    $(divHorariosBarbeiros).show()

    sessionStorage.setItem('schedule.day', date.day)
    sessionStorage.setItem('schedule.month', date.month)
}

const setHorario = (time) => {
    sessionStorage.setItem('schedule.hour', time.hour)
    sessionStorage.setItem('schedule.minutes', time.minutes)

    $(divTabCheckout).css("cursor", "pointer")


    handlerSelectTab(4)

    handlerUnselectTab(1)
    handlerUnselectTab(2)
    handlerUnselectTab(3)

    $(divTabCheckout).on("click", function(){
        handlerSelectTab(4)

        handlerUnselectTab(1)
        handlerUnselectTab(2)
        handlerUnselectTab(3)
        
        handlerCheckoutPage()
    })

    handlerCheckoutPage()
}

const handlerCheckoutPage = () => {
    $(divCheckoutProfessionalName).html(formatLi(sessionStorage.getItem("professional.name")))

    let formatedDate = sessionStorage.getItem("schedule.day") + '/' + sessionStorage.getItem("schedule.month") + " - " + sessionStorage.getItem("schedule.hour") + ':' + sessionStorage.getItem("schedule.minutes")
    $(divCheckoutDate).html(formatLi(formatedDate))

    $(divCheckoutServices).html(formatLi(sessionStorage.getItem("service.name")))

    let formatedTotalValue = Number(sessionStorage.getItem("service.price")).toLocaleString('pt-BR', {
                                style: 'currency', 
                                currency: sessionStorage.getItem("service.currency")
                            })
    $(divCheckouTotalValue).html(formatLi(formatedTotalValue))
}

const formatLi = (str) => {
    return `<li>${str}</li>`
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
                setService(service)
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
                setProfessional(professional)
            })
        })

        const initialDate = new Date();
        for(let i = 0; i <= 30; i++){
            let idElement = 'date-element-' + i;
            let currentDate = new Date(initialDate); // copia a data inicial
            currentDate.setDate(initialDate.getDate() + i);

            // Formatação dos dados
            const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            let diaSemana = diasSemana[currentDate.getDay()];
            let dia = currentDate.getDate();
            let mes = currentDate.toLocaleString('pt-BR', { month: 'long' });
            mes = mes.charAt(0).toUpperCase() + mes.slice(1);

            $(divDatesContainer).append(`
                <div style="min-width: 80px; cursor: pointer;">
                    <div id=${idElement} class="border rounded p-2">
                        <div class="w-100 d-flex text-center justify-content-center flex-column"
                            style="min-height: 40px;">
                            <span>${diaSemana}</span>
                            <span class="fw-bold">${dia}</span>
                            <span class="fw-bold">${mes}</span>
                        </div>
                    </div>
                </div>
            `);

            $('#' + idElement).on('click', function(){
                setDate({ day: dia, month: currentDate.getMonth() + 1 })
                resetSelectedDate()
                $('#' + idElement).addClass('border-dark')
            });
        }

        for(let i = 0; i <= 3; i++){
            $(divHorariosBarbeiros).append(`
                    <div class="col-12 mb-2">
                        <div class="row">
                            <div class="col">
                                <button  type="button"
                                    class="btn btn-outline-dark w-100"
                                    onClick="setHorario({ hour: '10', minutes: '00'})"
                                    >10:00</button>
                            </div>
                            <div class="col">
                                <button  type="button"
                                    class="btn btn-outline-dark w-100"
                                    onClick="setHorario({ hour: '10', minutes: '00'})"
                                >10:00</button>
                            </div>
                            <div class="col">
                                <button type="button"
                                class="btn btn-outline-dark w-100"
                                onClick="setHorario({ hour: '10', minutes: '00'})"
                                >10:00</button>
                            </div>
                        </div>
                    </div>
                `)
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
            $(divHorariosBarbeiros).hide()

            if(sessionStorage.getItem('schedule.day')){
                $(divHorariosBarbeiros).show()
            }

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

const resetTabClick = (tabId) => {
    switch(tabId){
        case 1:
            $(divTabProfessionals).off('click').on('click', function (){})
            $(divTabProfessionals).css('cursor', 'default')
            break;
            
        case 2:
            $(divTabService).off('click').on('click', function (){})
            $(divTabService).css('cursor', 'default')
            break;
            
        case 3:
            $(divTabDate).off('click').on('click', function (){})
            $(divTabDate).css('cursor', 'default')
            break;
            
        case 4:
            $(divTabCheckout).off('click').on('click', function (){})
            $(divTabCheckout).css('cursor', 'default')
            break;
    }
}