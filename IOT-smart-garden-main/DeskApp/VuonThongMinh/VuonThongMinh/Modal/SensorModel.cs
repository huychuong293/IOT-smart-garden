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
    public class SensorModel: BaseModel<SensorModel>
    {
        [FirestoreProperty]
        public int Light { get; set; }
        [FirestoreProperty]
        public StatusEnum Rain { get; set; }
        [FirestoreProperty]
        public int Soil { get; set; }
        [FirestoreProperty]
        public int Temperature { get; set; }

        public override SensorModel ToDomain()
        {
            return new SensorModel
            {
                Time = Time,
                Light = Light,
                Rain = Rain,
                Soil = Soil,
                Temperature = Temperature
            };
        }
    }
    [FirestoreData]
    public class HistorySensorModal
    {
        [FirestoreProperty]
        public IEnumerable<SensorModel> Value { get; set; }
    }
}
