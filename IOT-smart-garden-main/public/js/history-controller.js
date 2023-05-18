import Common from "./common.js";
import CONSTANTS from "./constants.js";
import FirebaseSerive from "./firebase-service.js";
import TEMPLATE from "./templateHTML.js";
const firebaseService = new FirebaseSerive();


let isDesktop = window.innerWidth > 640;
console.log(isDesktop)
if(!isDesktop){
    checkResolution();
}

function checkResolution(){
    if(!isDesktop){
        // $('#table-sensor-container')
        // $('#table-device-container')
        $('#tableDevice').remove();
        $('#tableSensor').remove();
    }
}

initDataHistory();
refreshBtn.addEventListener('click', () =>{
    initDataHistory();
});
function initDataHistory(){
    firebaseService.getFireStoreFromCollection(`${CONSTANTS.HISTORY}-Sensor`, (event)=>{
        let dataSource = [];
        event.docs?.forEach(item =>{
            dataSource = item.data().Value ? [...dataSource,...item.data().Value] : dataSource;
        });
        if(dataSource.length === 0) return;
        // dataSource.sort((a, b) => {
        //     const timeA = a.Time.toMillis();
        //     const timeB = b.Time.toMillis();
        //     return timeA === timeB ? 0 : ((timeA < timeB) ? 1 : -1);
        // });

        $('#pagination-sesor-container').pagination({
            dataSource: dataSource,
            pageSize: 10,
            showGoInput: false,
            showPageNumbers: false,
            showNavigator: true,
            showGoInput: true,
            showGoButton: true,
            callback: function (dataPagin, pagination) {
                if(!isDesktop){
                    let html = ''
                    dataPagin.forEach((item, index) => {
                        html += TEMPLATE.HistorySensorMobile(index, Common.formatDateTime(item.Time.toDate()), item.Temperature, item.Soil, item.Light, item.Rain);
                    });
                    html = `
                    <div id="accordion" class=" relative">
                        ${html}
                    </div>
                    `;
                    $()
                    $('#accordion').remove();
                    $('#pagination-sesor-container').prepend(html)
                    $( "#accordion" ).accordion({
                        collapsible: true,
                        heightStyle: "content"
                    });
                    $("#accordion>.ui-accordion-content").show();
                    $('#pagination-sesor-container').addClass('active')
                }
                else {
                    let html = ''
                    dataPagin.forEach((item, index) => {
                        html += TEMPLATE.HistorySensor(index,item.Time, item.Temperature, item.Soil, item.Light, item.Rain);
                    });
                    $('#table-container').html(html);
                }
                const rowElement = [];
                dataPagin.forEach((_, index) => {
                    rowElement.push($(`#sensorRow${index}`))
                });
                rowElement.forEach((element, index) => {
                    element.delay((index * 100)).animate({
                        height: '30px',
                        opacity: '1',
                    }, 100, "linear", () => {
                    })
                });
                $('#pagination-sesor-container').addClass('active')
            }
        });
    });
    
    firebaseService.getFireStoreFromCollection(`${CONSTANTS.HISTORY}-Device`, (event)=>{
        let dataSource = [];
        event.docs?.forEach(item =>{
            dataSource = item.data().Value ? [...dataSource,...item.data().Value] : dataSource;
        });
        if(dataSource.length === 0) return;
        // dataSource.sort((a, b) => {
        //     const timeA = a.Time.toMillis();
        //     const timeB = b.Time.toMillis();
        //     return timeA === timeB ? 0 : ((timeA < timeB) ? 1 : -1);
        // });
        $('#pagination-device-container').pagination({
            dataSource: dataSource,
            pageSize: 10,
            showGoInput: false,
            showPageNumbers: false,
            showNavigator: true,
            showGoInput: true,
            showGoButton: true,
            callback: function (dataPagin, pagination) {
                
                if(!isDesktop){
                    let html = ''
                    dataPagin.forEach((item, index) => {
                        html += TEMPLATE.HistoryDeviceMobile(index, item.Time, item.Fan, item.Motor, item.Pump, item.Warm);
                    });
                    html = `
                    <div id="accordion-1" class=" relative">
                        ${html}
                    </div>
                    <div id="pagination-device-container" class="mt-3 opacity-0 transition-all duration-500"></div>
                    `;
                    $('#accordion-1').remove();
                    $('#pagination-device-container').prepend(html)
                    $( "#accordion-1" ).accordion({
                        collapsible: true,
                        heightStyle: "content",
                        animate: 200
                    });
                    $("#accordion-1>.ui-accordion-content").show();
                }
                else {
                    let html = ''
                    dataPagin.forEach((item, index) => {
                        html += TEMPLATE.HistoryDevice(index, item.Time, item.Fan, item.Motor, item.Pump, item.Warm);
                    });
                    $('#table-device-body').html(html);
                }
                const rowElement = [];
                dataPagin.forEach((_, index) => {
                    rowElement.push($(`#deviceRow${index}`))
                });
                rowElement.forEach((element, index) => {
                    element.delay((index * 100)).animate({
                        opacity: '1',
                    }, 100, "linear", () => {
                    })
                });
                $('#pagination-device-container').addClass('active')
            }
        });
    });
}
$('#speed').change(e => {
    if (e.target.value == 1) {
        $('#table-sensor-container').css('display', 'block')
        $('#table-device-container').css('display', 'none')
    }
    if (e.target.value == 0) {
        $('#table-device-container').css('display', 'block')
        $('#table-sensor-container').css('display', 'none')
    }
});

const flatpicker = flatpickr(document.getElementById('date-time-picker'), {
    enableTime: false,
    dateFormat: "d-m-Y",
});

flatpicker.config.onChange.push((e)=>{
    const datePicked = e[0];
    console.log(Common.formatDateTime(datePicked))
    if(datePicked){
        $('#btn-clear-date-picker').css('opacity',1);
        return;
    }
    $('#btn-clear-date-picker').css('opacity',0);
});

$('#btn-clear-date-picker').on('click',async (e)=>{
    flatpicker.clear();
    // await firebaseService.getDataWithCondition(CONSTANTS.HISTORY,'Sensor','asas');
})
logout.addEventListener('click', () => {
    firebaseService.signOut();
});

window.addEventListener('resize',(e) =>{
    isDesktop = window.innerWidth > 640;
    checkResolution();
});