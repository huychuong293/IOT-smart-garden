using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VuonThongMinh.Common
{
    public static class Constants
    {

        public const string LEVEL_HIGH = "High";
        public const string LEVEL_LOW = "Low";
        public const string HISTORY_SENSOR = "History-Sensor";
        public const string HISTORY_DEVICE = "History-Device";

        public const string LIGHT = "Light";
        public const string TEMPERATURE = "Temperature";
        public const string SOIL = "Soil";
        public const string RAIN = "Rain";

        public const string FAN = "Fan";
        public const string LAMP = "Lamp";
        public const string MOTOR = "Motor";
        public const string PUMP = "Pump";
        public const string WARM = "Warm";
        public const string TIME = "time";
        


        public static string ACT_VALUE_ROOT = "ActValue";

        public static string SETTING_ROOT = "Setting";
        public static string SETTING_MANUAL = $"{SETTING_ROOT}/Manual";
        public static string SETTING_MODE = $"{SETTING_ROOT}/Mode";

        public static string SETTING_LIMIT_ROOT = $"{SETTING_ROOT}/SetLimit";
        public static string SETTING_LIMIT_LIGHT = $"{SETTING_LIMIT_ROOT}/Light";
        public static string SETTING_LIMIT_SOIL = $"{SETTING_LIMIT_ROOT}/Soil";
        public static string SETTING_LIMIT_TEMPERATURE = $"{SETTING_LIMIT_ROOT}/Temperature";
        public static string SETTING_LIMIT_HUMIDITY = $"{SETTING_LIMIT_ROOT}/Humidity";

    }
}
