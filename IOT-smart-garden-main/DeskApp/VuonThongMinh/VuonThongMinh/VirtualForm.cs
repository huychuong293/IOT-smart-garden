using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using VuonThongMinh.Common;
using VuonThongMinh.Modal;
using VuonThongMinh.Service;

namespace VuonThongMinh
{
    public partial class VirtualForm : Form
    {

        private readonly CloudFireStoreService _fireStoreService = new CloudFireStoreService();
        public VirtualForm()
        {
            InitializeComponent();
        }

        private async void setDevice_Click(object sender, EventArgs e)
        {
            var data = new DeviceModel
            {
                Fan = ConvertBoolToEnumStatus(toggleFan.Value),
                Motor = ConvertBoolToEnumStatus(toggleMotor.Value),
                Pump = ConvertBoolToEnumStatus(togglePump.Value),
                Warm = ConvertBoolToEnumStatus(toggleWarm.Value),
                Time = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss")
            };
            await _fireStoreService.UpdateArrayAsync(Constants.HISTORY_DEVICE, datePicker.Value.ToString("dd-MM-yyyy"),data);
            MessageBox.Show("Successfully", "Information", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private StatusEnum ConvertBoolToEnumStatus(bool state)
        {
            return state ? StatusEnum.ON : StatusEnum.OFF;
        }

        private async void setSensor_ClickAsync(object sender, EventArgs e)
        {
            var data = new SensorModel()
            {
                Light = (int)txtLight.Value,
                Rain = ConvertBoolToEnumStatus(rainToggle.Value),
                Soil = (int)txtSoil.Value,
                Temperature = (int)txtTemp.Value,
                Time = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss")
            };
            await _fireStoreService.UpdateArrayAsync(Constants.HISTORY_SENSOR, datePicker.Value.ToString("dd-MM-yyyy"), data);
            MessageBox.Show("Successfully","Information",MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }
}
