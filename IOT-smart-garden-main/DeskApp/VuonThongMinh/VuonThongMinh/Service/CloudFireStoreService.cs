using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Google.Cloud.Firestore;
using VuonThongMinh.Common;
using VuonThongMinh.Modal;

namespace VuonThongMinh.Service
{
    public class CloudFireStoreService
    {
        private readonly FirestoreDb db;
        public CloudFireStoreService()
        {
            string currentDomain = AppDomain.CurrentDomain.BaseDirectory;
            if (currentDomain.Contains("bin"))
            {
                currentDomain = currentDomain.Substring(0, currentDomain.IndexOf("bin"));
            }

            string path = currentDomain + @"cloud-config.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);
            db = FirestoreDb.Create(AppConfiguration.ProjectName);
        }

        public async Task<List<DocumentReference>> ReadCollection(string collection)
        {
            return await db.Collection(collection).ListDocumentsAsync().ToListAsync();
        }
        public async Task<T> GetDocumentAsync<T>(string collect, string document)
        {
            CollectionReference collection = db.Collection(collect);
            var docRef = collection.Document(document);
            if(docRef!= null)
            {
                var snapShot = await docRef.GetSnapshotAsync();
                return snapShot.Exists ? snapShot.GetValue<T>("Value") : default;
            }
            return default;
        }

        public async Task UpdateArrayAsync<T>(string collect, string doc, T data)
        {
            DocumentReference docRef = db.Collection(collect).Document(doc);
            var snapShot = await docRef.GetSnapshotAsync();
            if(snapShot.Exists) {
                await docRef.UpdateAsync("Value",FieldValue.ArrayUnion(data));
                await docRef.UpdateAsync("Time",DateTime.UtcNow);
            }
            else
            {
                Dictionary<string, object> docData = new Dictionary<string, object>
                 {
                    { "Time" , DateTime.UtcNow },
                    {"Value", new List<T>(){ data } }
                 };
                await docRef.SetAsync(docData);
            }
           
        }
    }

}
