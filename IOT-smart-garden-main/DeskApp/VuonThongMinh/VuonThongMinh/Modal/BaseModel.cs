using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VuonThongMinh.Modal
{
    public abstract class BaseModel<T>
    {
        [FirestoreProperty]
        public string Time { get; set; }

        public abstract T ToDomain();
    }
}
