using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VuonThongMinh.Common;

namespace VuonThongMinh.Modal
{
    [FirestoreData]
    public class DeviceModel: BaseModel<DeviceModel>
    {
        [FirestoreProperty]
        public StatusEnum Fan { get; set; }
        //[FirestoreProperty]
        //public StatusEnum Lamp { get; set; }
        [FirestoreProperty]
        public StatusEnum Motor { get; set; }
        [FirestoreProperty]
        public StatusEnum Pump { get; set; }
        [FirestoreProperty]
        public StatusEnum Warm { get; set; }

        public override DeviceModel ToDomain()
        {
            return new DeviceModel
            {
                Time = Time,
                Fan = Fan,
                Motor = Motor,
                Pump = Pump,
                Warm = Warm
            };
        }
    }
}
