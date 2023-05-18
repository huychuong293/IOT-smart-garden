using FireSharp;
using FireSharp.Config;
using FireSharp.EventStreaming;
using FireSharp.Interfaces;
using FireSharp.Response;
using System;
using System.Threading.Tasks;
using VuonThongMinh.Common;

namespace VuonThongMinh.Service
{
    public class FirebaseService
    {
        private readonly FirebaseClient _client;
        private readonly IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = AppConfiguration.SecretKey,
            BasePath = AppConfiguration.BaseUrlFirebase
        };
        public FirebaseService()
        {
            _client = new FirebaseClient(config);
        }

        public bool CheckConnectionFirebase()
        {
            string result = AppConfiguration.SecretKey;
            return _client != null;
        }

        public async Task<T> GetValueAsync<T>(string path)
        {
            FirebaseResponse response = await _client.GetAsync(path);
            return response.ResultAs<T>();
        }

        public async void ObservableValueChange(string path, Action<ValueChangedEventArgs> callback)
        {
            await _client.OnAsync(path, changed: (_, args) =>
            {
                callback(args);
            });
        }

        public async Task<bool> SetValue<T>(string path, T value)
        {
            SetResponse response = await _client.SetAsync(path, value);
            var result = response.ResultAs<T>();
            return result != null;
        }
    }
}
