using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VuonThongMinh.Common;

namespace VuonThongMinh.Modal
{
    public class ActValueModel
    {
        public StatusEnum Fan { get; set; }
        public StatusEnum Warm { get; set; }
        public StatusEnum Motor { get; set; }
        public StatusEnum Pump { get; set; }

        public int Light { get; set; }
        public int Temperature { get; set; }
        public bool Rain { get; set; }
        public int Soil { get; set; }

    }
}
