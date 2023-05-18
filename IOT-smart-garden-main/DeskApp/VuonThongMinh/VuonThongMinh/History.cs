using Bunifu.UI.WinForms;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Windows.Forms;
using VuonThongMinh.Common;
using VuonThongMinh.Modal;
using VuonThongMinh.Service;

namespace VuonThongMinh
{
    public partial class History : Form
    {

        private readonly CloudFireStoreService _fireStoreService = new CloudFireStoreService();
        private static History _historyFormInstance;
        internal static History form
        {
            get
            {
                if(_historyFormInstance == null)
                {
                    _historyFormInstance = new History();
                }
                return _historyFormInstance;
            }
        }
        public History()
        {
            InitializeComponent();
            _historyFormInstance = this;
            BuildDataGridView<SensorModel>(dataGridViewSensor, Constants.HISTORY_SENSOR);
            BuildDataGridView<DeviceModel>(dataGridViewDevice, Constants.HISTORY_DEVICE);
        }

        private async void BuildDataGridView<T>(BunifuDataGridView gridView, string path) where T : BaseModel<T>
        {
            SetLoadding(true);
            List<T> sources = new List<T>();
            var documentRef = await _fireStoreService.ReadCollection(path);
            foreach (var doc in documentRef)
            {
                var docSnapshot = await doc.GetSnapshotAsync();
                try
                {
                    var response = docSnapshot.GetValue<IEnumerable<T>>("Value") ?? default;
                    if (!response.Any()) return;
                    var result = response.Select(item => item.ToDomain());
                    sources.AddRange(result);
                }
                catch{}
            }
            UpdateDataGridView(gridView, sources);
            SetLoadding(false);
        }

        private void UpdateDataGridView<T>(BunifuDataGridView gridView, List<T> data)
        {
            BindingSource bindingSource = new BindingSource();
            BindingList<T> listGridView = new BindingList<T>();
            if(data != null && data.Any())
            {
                data.ForEach(item =>
                {
                    listGridView.Add(item);
                });
            }
            bindingSource.DataSource = listGridView;
            gridView.DataSource = bindingSource;
        }

        private void SetLoadding(bool status)
        {
            tabControl.Visible = !status;
            txtLoading.Visible = status;
        }

        private string GenerateStateDevice(bool state)
        {
            return state ? "ON" : "OFF";
        }

        private void extBtn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void History_FormClosed(object sender, FormClosedEventArgs e)
        {
            _historyFormInstance = null;
        }

        private async void button1_Click(object sender, EventArgs e)
        {
            SetLoadding(true);
            var picker = datePicker.Value.ToString("dd-MM-yyyy");
            var sensorSearchResult = (await _fireStoreService.GetDocumentAsync<IEnumerable<SensorModel>>(Constants.HISTORY_SENSOR, picker)) ?? new List<SensorModel>();
            UpdateDataGridView(dataGridViewSensor, sensorSearchResult.Select(item => item.ToDomain()).ToList());

            var deviceSearchResult = (await _fireStoreService.GetDocumentAsync<IEnumerable<DeviceModel>>(Constants.HISTORY_DEVICE, picker)) ?? new List<DeviceModel>();
            UpdateDataGridView(dataGridViewDevice, deviceSearchResult.Select(item => item.ToDomain()).ToList() ?? default);
            SetLoadding(false);
        }

        private void getallbtn_Click(object sender, EventArgs e)
        {
            BuildDataGridView<SensorModel>(dataGridViewSensor, Constants.HISTORY_SENSOR);
            BuildDataGridView<DeviceModel>(dataGridViewDevice, Constants.HISTORY_DEVICE);
        }
    }
}
