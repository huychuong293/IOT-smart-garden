const STATE = {
    ON: 1,
    OFF: 0
};

const DEVICE = {
    FAN: 'Fan',
    LAMP: 'Lamp',
    MOTOR: 'Motor',
    PUMP: 'Pump',
    WARM: 'Warm'
}

const SENSOR = {
    TEMPERATURE: 'Temperature',
    SOIL: 'Soil',
    LIGHT: 'Light',
    RAIN: 'Rain'
}

const LEVEL ={
    HIGH: 'High',
    LOW: 'Low'
}

const MANUAL_DEVICE_ROOT = 'Setting/Manual';

const MODE = 'Setting/Mode';

const SETTING_LIMIT_ROOT = {
    LIGHT: 'Setting/SetLimit/Light',
    SOIL: 'Setting/SetLimit/Soil',
    TEMPERATURE: 'Setting/SetLimit/Temperature',
}


const ACT_VALUE_ROOT = {
    SENSOR: 'ActValue',
    DEVICE: 'ActValue'
}

const MANUAL_DEVICE = {
    FAN: `${MANUAL_DEVICE_ROOT}/${DEVICE.FAN}`,
    LAMP: `${MANUAL_DEVICE_ROOT}/${DEVICE.LAMP}`,
    MOTOR: `${MANUAL_DEVICE_ROOT}/${DEVICE.MOTOR}`,
    PUMP: `${MANUAL_DEVICE_ROOT}/${DEVICE.PUMP}`,
    WARM: `${MANUAL_DEVICE_ROOT}/${DEVICE.WARM}`,
}
const LIGHT_LEVEL = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
}


const SETTING_LIMIT = {
    LIGHT: {
        HIGH: `${SETTING_LIMIT_ROOT.LIGHT}/${LEVEL.HIGH}`,
        LOW: `${SETTING_LIMIT_ROOT.LIGHT}/${LEVEL.LOW}`
    },
    SOIL: {
        HIGH: `${SETTING_LIMIT_ROOT.SOIL}/${LEVEL.HIGH}`,
        LOW: `${SETTING_LIMIT_ROOT.SOIL}/${LEVEL.LOW}`
    },
    TEMPERATURE: {
        HIGH: `${SETTING_LIMIT_ROOT.TEMPERATURE}/${LEVEL.HIGH}`,
        LOW: `${SETTING_LIMIT_ROOT.TEMPERATURE}/${LEVEL.LOW}`
    }
}


const ACT_VALUE = {
    SENSOR: {
        TEMPERATURE: `${ACT_VALUE_ROOT.SENSOR}/${SENSOR.TEMPERATURE}`,
        SOIL: `${ACT_VALUE_ROOT.SENSOR}/${SENSOR.SOIL}`,
        LIGHT: `${ACT_VALUE_ROOT.SENSOR}/${SENSOR.LIGHT}`,
        RAIN: `${ACT_VALUE_ROOT.SENSOR}/${SENSOR.RAIN}`
    },
    DEVICE: {
        FAN: `${ACT_VALUE_ROOT.DEVICE}/${DEVICE.FAN}`,
        LAMP: `${ACT_VALUE_ROOT.DEVICE}/${DEVICE.LAMP}`,
        MOTOR: `${ACT_VALUE_ROOT.DEVICE}/${DEVICE.MOTOR}`,
        PUMP: `${ACT_VALUE_ROOT.DEVICE}/${DEVICE.PUMP}`,
        WARM: `${ACT_VALUE_ROOT.DEVICE}/${DEVICE.WARM}`,
    }
}

const HISTORY ='History';


const STATUS_REQUEST = {
    OK: 'OK',
    FAIL: 'FAIL'
};

const MAX_VALUE_SENSOR = {
    TEMPERATURE: 100,
    SOIL: 100,
    LIGHT: 1000
};

// Combine object
const CONSTANTS = {
    STATE: STATE,
    DEVICE: DEVICE,
    LEVEL: LEVEL,
    MANUAL_DEVICE_ROOT: MANUAL_DEVICE_ROOT,
    MODE: MODE,
    SETTING_LIMIT_ROOT: SETTING_LIMIT_ROOT,
    ACT_VALUE_ROOT: ACT_VALUE_ROOT,
    MANUAL_DEVICE: MANUAL_DEVICE,
    LIGHT_LEVEL: LIGHT_LEVEL,
    SETTING_LIMIT: SETTING_LIMIT,
    ACT_VALUE: ACT_VALUE,
    HISTORY: HISTORY,
    STATUS_REQUEST: STATUS_REQUEST,
    MAX_VALUE_SENSOR: MAX_VALUE_SENSOR
}
export default  CONSTANTS;