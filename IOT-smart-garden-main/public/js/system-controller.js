import { CHART_CONFIG } from "./chart.js";
import CONSTANTS from "./constants.js";
import FirebaseSerive from "./firebase-service.js";
import CONFIG_GAUGE_DEFAULT from "./gauge.config.js";  
import { Pluggin } from "./pluggin-service.js";

const MAX_POINT_CHART = 5;
const firebaseService = new FirebaseSerive();

// Gauge
function initGauge(id, maxValue = 100, initValue = 0, config = CONFIG_GAUGE_DEFAULT(maxValue)) {
	return Gauge(id, {
		max: maxValue,
		label: (value) => {
			return `${Math.round(value)}/${maxValue}`;
		},
		value: initValue,
		color: (value) => {
			const result = config.filter((item, index) => value <= item.level);
			return result[result.length - 1]?.color || "#3CCF4E";
		}
	});
}
const gaugeTemperature = initGauge(gaugeTemp, CONSTANTS.MAX_VALUE_SENSOR.TEMPERATURE, 0);
const gaugeLight = initGauge(gaugelight, CONSTANTS.MAX_VALUE_SENSOR.LIGHT, 450);
const gaugeSoil = initGauge(gaugesoil, CONSTANTS.MAX_VALUE_SENSOR.SOIL, 10);

// Light sensor
await firebaseService.observableValueChange$(CONSTANTS.SETTING_LIMIT.LIGHT.HIGH, (e) => {
	actLightLimitHigh.innerHTML = `<b>${e._node.value_}</b>`;
});
await firebaseService.observableValueChange$(CONSTANTS.SETTING_LIMIT.LIGHT.LOW, (e) => {
	actLightLimitLow.innerHTML = `<b>${e._node.value_}</b>`;
});
await firebaseService.observableValueChange$(CONSTANTS.ACT_VALUE.SENSOR.LIGHT, (e) => {
	actLight.innerHTML = `<b>${e._node.value_}</b>`;
	gaugeLight.setValueAnimated(e._node.value_, 1);
});

// Soil sensor
await firebaseService.observableValueChange$(CONSTANTS.SETTING_LIMIT.SOIL.HIGH, (e) => {
	actSoilLimitHigh.innerHTML = `<b>${e._node.value_}</b>`;
});
await firebaseService.observableValueChange$(CONSTANTS.SETTING_LIMIT.SOIL.LOW, (e) => {
	actSoilLimitLow.innerHTML = `<b>${e._node.value_}</b>`;
});
await firebaseService.observableValueChange$(CONSTANTS.ACT_VALUE.SENSOR.SOIL, (e) => {
	actSoil.innerHTML = `<b>${e._node.value_}</b>`;
	gaugeSoil.setValueAnimated(e._node.value_, 1);
});

// Temperature sensor
await firebaseService.observableValueChange$(CONSTANTS.SETTING_LIMIT.TEMPERATURE.HIGH, (e) => {
	actTempLimitHigh.innerHTML = `<b>${e._node.value_}</b>`;
});
await firebaseService.observableValueChange$(CONSTANTS.SETTING_LIMIT.TEMPERATURE.LOW, (e) => {
	actTempLimitLow.innerHTML = `<b>${e._node.value_}</b>`;
});
await firebaseService.observableValueChange$(CONSTANTS.ACT_VALUE.SENSOR.TEMPERATURE, (e) => {
	actTemp.innerHTML = `<b>${e._node.value_}</b>`;
	gaugeTemperature.setValueAnimated(e._node.value_, 1) 
});

// Rain sensor
await firebaseService.observableValueChange$(CONSTANTS.ACT_VALUE.SENSOR.RAIN, (e) => {
	const label = e._node.value_ ? "Mưa" : "Không mưa";
	e._node.value_ ? imgRain.setAttribute('src','./assets/svg/rainy.svg') : imgRain.setAttribute('src','./assets/svg/cloudy.svg');
	actRain.innerHTML = `<b>${label}</b>`;
});

// on change mode event and obsevable to change state 
modeToggle.addEventListener('change',async ()=>{
	await firebaseService.setValue(CONSTANTS.MODE,Number(modeToggle.checked));
});

await firebaseService.observableValueChange$('Setting/Mode', (e) => {
	updateStateLightMode(e.val());
	modeToggle.checked = !!e.val();
	modeLabel.textContent = Number(e.val()) === CONSTANTS.STATE.OFF ? "AUTO" : "MAN";
});

function updateStateLightMode(currentMode) {
	const manualElement = document.querySelectorAll('.control-manual') || [];
	const modeElement = document.getElementById("mode");
	modeElement.classList.remove('manual', 'auto');
	const [pumpMb,warmMb, motorMb]= controlManMobile.children;
	switch (currentMode) {
		case CONSTANTS.STATE.ON:
			manualElement.forEach(ele => {
				ele.classList.remove('active');
				ele.classList.add('active');
				modeElement.classList.add('manual');
			});
			pumpMb.style.display = 'block';
			motorMb.style.display = 'block';
			break;
		case CONSTANTS.STATE.OFF:
			manualElement.forEach(ele => {
				ele.classList.remove('active');
				modeElement.classList.add('auto');
			});
			pumpMb.style.display = 'none';
			motorMb.style.display = 'none';
		default:
			return;
	}
}

// set limit warning for sensor
async function setLimit(data = []) {
	let promiseGroup = [];
	data.length && data.forEach(item => {
		promiseGroup.push(firebaseService.setValue(item.path, item.value));
	});
	const result = await Promise.all(promiseGroup);
	result.every(x => x === CONSTANTS.STATUS_REQUEST.OK) ? alert('Thiết lập giá trị thành công') : alert("Thiết lập giá trị thất bại");
}
setLightLimit.addEventListener('click', async () => {
	setLimit([
		{
			path: CONSTANTS.SETTING_LIMIT.LIGHT.HIGH,
			value: +lightHigh.value
		},
		{
			path: CONSTANTS.SETTING_LIMIT.LIGHT.LOW,
			value: +lightLow.value
		},
	])
});

setSoilLimit.addEventListener('click', async () => {
	setLimit([
		{
			path: CONSTANTS.SETTING_LIMIT.SOIL.HIGH,
			value: +soilHigh.value
		},
		{
			path: CONSTANTS.SETTING_LIMIT.SOIL.LOW,
			value: +soilLow.value
		},
	])
});



setTempLimit.addEventListener('click', async () => {
	setLimit([
		{
			path: CONSTANTS.SETTING_LIMIT.TEMPERATURE.HIGH,
			value: +tempHigh.value
		},
		{
			path: CONSTANTS.SETTING_LIMIT.TEMPERATURE.LOW,
			value: +tempLow.value
		},
	])
});

// Control manual
// Warm
warmToggle.addEventListener('change',async (e)=>{
	await firebaseService.setValue(CONSTANTS.MANUAL_DEVICE.WARM, Number(e.target.checked));
});

warmToggleMb.addEventListener('change',async (e)=>{
	await firebaseService.setValue(CONSTANTS.MANUAL_DEVICE.WARM, Number(e.target.checked));
});

firebaseService.observableValueChange$(CONSTANTS.MANUAL_DEVICE.WARM,(e)=>{
	const isActive = e._node.value_;
	warmToggle.checked = isActive;
	warmToggleMb.checked = isActive;
	updateStateManualDevice(warmmanImg, isActive,'image/warmon.png','image/warmoff.png');
});

// Pump
pumpToggle.addEventListener('change',async (e)=>{
	await firebaseService.setValue(CONSTANTS.MANUAL_DEVICE.PUMP, Number(e.target.checked));
});
pumpToggleMb.addEventListener('change',async (e)=>{
	await firebaseService.setValue(CONSTANTS.MANUAL_DEVICE.PUMP, Number(e.target.checked));
});
firebaseService.observableValueChange$(CONSTANTS.MANUAL_DEVICE.PUMP,(e)=>{
	const isActive = e._node.value_;
	pumpToggle.checked = isActive;
	pumpToggleMb.checked = isActive;
	updateStateManualDevice(pumpmanImg, isActive,'image/pumpon.png','image/pumpoff.png');
});

// Motor
motorToggle.addEventListener('change',async (e)=>{
	await firebaseService.setValue(CONSTANTS.MANUAL_DEVICE.MOTOR, Number(e.target.checked));
});
motorToggleMb.addEventListener('change',async (e)=>{
	await setValue(CONSTANTS.MANUAL_DEVICE.MOTOR, Number(e.target.checked));
});
firebaseService.observableValueChange$(CONSTANTS.MANUAL_DEVICE.MOTOR,(e)=>{
	const isActive = e._node.value_;
	motorToggle.checked = isActive;
	motorToggleMb.checked = isActive;
	updateStateManualDevice(motormanImg, isActive,'image/motoron.png','image/motoroff.png');
});


function updateStateManualDevice(src, isActive, stateOn, stateOff){
	src.setAttribute('src',isActive ? stateOn: stateOff);
	src.classList.remove('brightness-100','brightness-50')
	src.classList.add(isActive ? 'brightness-100' :'brightness-50')
}

// Chart
function updateData(chart, data) {
	setInterval(() => {
		let hours = (new Date).getHours();
		let minute = (new Date).getMinutes();
		let seconds = (new Date).getSeconds();
		let time = hours + ":" + minute + ":" + seconds;
		addData(chart, time, +data.textContent);
		const labels = chart.config._config.data.labels;
		if (labels.length > MAX_POINT_CHART) {
			removeData(chart);
		}
	}, 1000);
}

function addData(chart, label, data) {
	chart.data.labels.push(label);
	chart.data.datasets.forEach((dataset) => {
		dataset.data.push(data);
	});
	chart.update();
}

function removeData(chart) {
	chart.data.labels.shift();
	chart.data.datasets.forEach((dataset) => {
		dataset.data.shift();
	});
	chart.update();
}

const ctx1 = chartTemperature.getContext('2d');
const ctx2 = chartHumidity.getContext('2d');
const ctx3 = chartIntensity.getContext('2d');
const mychart1 = new Chart(ctx1, CHART_CONFIG('NHIỆT ĐỘ', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 1)'));
var mychart2 = new Chart(ctx2, CHART_CONFIG('ĐỘ ẨM ĐẤT', ' rgba(118, 161, 87,0.2)', ' rgba(118, 161, 87,1)'));
const mychart3 = new Chart(ctx3, CHART_CONFIG('CƯỜNG ĐỘ ÁNH SÁNG', 'rgba(173, 170, 85, 0.2)', 'rgba(173, 170, 85, 1)', []));
updateData(mychart1, actTemp);
updateData(mychart2, actSoil);
updateData(mychart3, actLight);

logout.addEventListener('click',()=>{
	firebaseService.signOut();
});
