const HistorySensor = (index, time, temp, soil, light, rain) => `
<tr id="sensorRow${index}" class="shadow-md opacity-0  overflow-hidden">
    <td  class="whitespace-nowrap deviceTd${index} h-0  rounded-l-lg px-4 py-2 font-medium text-white text-sm lg:text-base">
        ${time}
    </td>
    <td  class="whitespace-nowrap deviceTd${index} h-0 px-4 py-2 text-gray-200 text-sm lg:text-base">
        ${temp}
    </td>
    <td class="whitespace-nowrap deviceTd${index} h-0 px-4 py-2 text-gray-200 text-sm lg:text-base">
        ${soil}
    </td>
    <td class="whitespace-nowrap deviceTd${index} h-0 px-4 py-2 text-gray-200 text-sm lg:text-base">
        ${light}
    </td>
    <td class="whitespace-nowrap deviceTd${index} h-0 rounded-r-lg px-4 py-2 text-gray-200 text-sm lg:text-base">
        ${rain ? 'Mưa' : 'Không Mưa'}
    </td>
</tr>
`;


const HistoryDevice = (index, time, fan, motor, pump, warm) => `
<tr id="deviceRow${index}" class="shadow-md opacity-0  overflow-hidden">
    <td   class="whitespace-nowrap deviceTd${index} h-0  rounded-l-lg px-4 py-2 font-medium text-white text-sm lg:text-base">
        ${time}
    </td>
    <td  class="whitespace-nowrap deviceTd${index} h-0 px-4 py-2 text-gray-200 text-sm lg:text-base">
        ${fan ? 'ON' : 'OFF'}
    </td>
    <td  class="whitespace-nowrap deviceTd${index} h-0 px-4 py-2 text-gray-200 text-sm lg:text-base">
        ${motor ? 'ON' : 'OFF'}
    </td>
    <td  class="whitespace-nowrap deviceTd${index} h-0 px-4 py-2 text-gray-200 text-sm lg:text-base">
        ${pump ? 'ON' : 'OFF'}
    </td>
    <td  class="whitespace-nowrap deviceTd${index} h-0 rounded-r-lg px-4 py-2 text-gray-200 text-sm lg:text-base">
        ${warm ? 'ON' : 'OFF'}
    </td>
</tr>`;

const HistorySensorMobile =  (index, time, temp, soil, light, rain) => `
        <h3 id="sensorRow${index}">${time}</h3>
        <div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-3">Temperature</div>
                <div>${temp}</div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-3">Soil</div>
                <div>${soil}</div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-3">Light</div>
                <div>${light}</div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-3">Rain</div>
                <div>${rain}</div>
            </div>
        </div>
        `;

const HistoryDeviceMobile =  (index, time, fan, motor, pump, warm) => `
        <h3 id="deviceRow${index}" class="mb-2">${time}</h3>
        <div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-3">Fan</div>
                <div>${fan}</div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-3">Motor</div>
                <div>${motor}</div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-3">Pump</div>
                <div>${pump}</div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-3">Warm</div>
                <div>${warm}</div>
            </div>
        </div>
`;
const TEMPLATE ={
    HistorySensor: HistorySensor,
    HistoryDevice: HistoryDevice,
    HistorySensorMobile: HistorySensorMobile,
    HistoryDeviceMobile: HistoryDeviceMobile
};

export default TEMPLATE;