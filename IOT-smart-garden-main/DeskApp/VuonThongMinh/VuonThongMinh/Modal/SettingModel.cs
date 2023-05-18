using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VuonThongMinh.Common;

namespace VuonThongMinh.Modal
{
    public class SettingModel
    {
        public StatusEnum Mode { get; set; }
        public DeviceModel Manual { get; set; }
        public SetLimitModel SetLimit { get; set; }
    }
    public class SetLimitModel
    {
        public LimitSetting Light { get; set; }
        public LimitSetting Soil { get; set; }
        public LimitSetting Temperature { get; set; }

    }
}
