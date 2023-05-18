using Bunifu.UI.WinForms;
using System;
using System.Threading;
using System.Windows.Forms;
using VuonThongMinh.Common;
using VuonThongMinh.Modal;
using VuonThongMinh.Service;

namespace VuonThongMinh
{
    public partial class Form1 : Form
    {
        private readonly FirebaseService _firebaseService = new FirebaseService();
        private readonly CloudFireStoreService _fireStoreService = new CloudFireStoreService();


        public Form1( )
        {
            InitializeComponent();  
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            InitializationSetup();
        }

        private async void InitializationSetup()
        {
            HandleSettingLimitChange(Constants.SETTING_LIMIT_LIGHT, slideHightLight, slideLowLight);
            HandleSettingLimitChange(Constants.SETTING_LIMIT_SOIL, slideHightSoil, slideLowSoil);
            HandleSettingLimitChange(Constants.SETTING_LIMIT_TEMPERATURE, slideHighTemp, slideLowTemp);
            //HandleSettingLimitChange(Constants.SETTING_LIMIT_HUMIDITY, slideHightSoil, slideLowHumi);
            HandleSettingModeChange();
            HandleMannualControlChange();
            ObservableActValueChangeAsync();
            var actValue = await _firebaseService.GetValueAsync<ActValueModel>(Constants.ACT_VALUE_ROOT);
            UpdateActValueController(actValue);
            var setting = await _firebaseService.GetValueAsync<SettingModel>(Constants.SETTING_ROOT);
            UpdateSettingController(setting);
        }

        private void UpdateActValueController(ActValueModel data)
        {
            imgRain.Image = data.Rain ? Properties.Resources.raining : Properties.Resources.cloudy__1_;
            data.Temperature = data.Temperature < 0 ? 0 : data.Temperature;
            gaugeTemp.Value= data.Temperature;
            gaugeHumidity.Value = data.Soil;
            gaugeLight.Value = data.Light;

            imgMotor.Image = data.Motor == StatusEnum.ON ? Properties.Resources.motor_on: Properties.Resources.motor_off;
            imgPump.Image = data.Pump == StatusEnum.ON ? Properties.Resources.pump_on: Properties.Resources.pump_off;
            imgWarm.Image = data.Warm == StatusEnum.ON ? Properties.Resources.warm_on: Properties.Resources.warm_off;
        }

        private void UpdateSettingController(SettingModel data)
        {
            modeToggle.Checked = data.Mode == StatusEnum.ON;
            toggleMotor.Checked = data.Manual.Motor == StatusEnum.ON;
            togglePump.Checked = data.Manual.Pump == StatusEnum.ON;
            toggleWarm.Checked = data.Manual.Warm == StatusEnum.ON;

            //slideHighHumi.Value = data.SetLimit.Soil.High;
            //slideLowHumi.Value = data.SetLimit.Soil.Low;

            slideHighTemp.Value = data.SetLimit.Temperature.High;
            slideLowTemp.Value = data.SetLimit.Temperature.Low;

            slideHightLight.Value = data.SetLimit.Light.High;
            slideLowLight.Value = data.SetLimit.Light.Low;
        }

        private void HandleSettingLimitChange(string pathLimit, BunifuHSlider sliderHigh, BunifuHSlider sliderLow)
        {
            _firebaseService.ObservableValueChange(pathLimit, (e) => OnMultiThread(() =>
            {
                string path = e.Path.Replace("/", "");
                switch (path)
                {
                    case Constants.LEVEL_HIGH:
                        if (!sliderHigh.InvokeRequired)
                            break;
                        sliderHigh.Invoke(new Action(() =>
                        {
                            sliderHigh.Value = int.Parse(e.Data);
                        }));
                        break;
                    case Constants.LEVEL_LOW:
                        sliderLow.Invoke(new Action(() =>
                        {
                            sliderLow.Value = int.Parse(e.Data);
                        }));
                        break;
                    default:
                        throw new Exception("Cannot handle");
                }
            }));
        }

        private void HandleSettingModeChange()
        {
            _firebaseService.ObservableValueChange(Constants.SETTING_MODE, (e) => OnMultiThread(() =>
            {
                bool isChecked = (StatusEnum)int.Parse(e.Data) == StatusEnum.ON;
                modeToggle.Invoke(new Action(() =>
                {
                    modeToggle.Checked = isChecked;
                }));
               
                toggleMotor.Invoke(new Action(() =>
                {
                    toggleMotor.Visible = isChecked;
                }));

                togglePump.Invoke(new Action(() =>
                {
                    togglePump.Visible = isChecked;
                }));
            }));
        }

        private void HandleSettingLimitChange(string pathLimit, BunifuVSlider sliderHigh, BunifuVSlider sliderLow)
        {
            _firebaseService.ObservableValueChange(pathLimit, (e) => OnMultiThread(() =>
            {
                string path = e.Path.Replace("/", "");
                switch (path)
                {
                    case Constants.LEVEL_HIGH:
                        if (!sliderHigh.InvokeRequired)
                            break;
                        sliderHigh.Invoke(new Action(() =>
                        {
                            sliderHigh.Value = int.Parse(e.Data);
                        }));
                        break;
                    case Constants.LEVEL_LOW:
                        sliderLow.Invoke(new Action(() =>
                        {
                            sliderLow.Value = int.Parse(e.Data);
                        }));
                        break;
                    default:
                        throw new Exception("Cannot handle");
                }
            }));
        }

        private void HandleMannualControlChange()
        {
            _firebaseService.ObservableValueChange(Constants.SETTING_MANUAL, (e) => OnMultiThread(() =>
            {
                string path = e.Path.Replace("/", "");
                switch (path)
                {
                    case Constants.PUMP:
                        togglePump.Invoke(new Action(() =>
                        {
                            togglePump.Checked = (StatusEnum)int.Parse(e.Data) == StatusEnum.ON;
                        }));
                        break;
                    case Constants.MOTOR:
                        toggleMotor.Invoke(new Action(() =>
                        {
                            toggleMotor.Checked = (StatusEnum)int.Parse(e.Data) == StatusEnum.ON;
                        }));
                        break;
                    case Constants.WARM:
                        toggleWarm.Invoke(new Action(() =>
                        {
                            toggleWarm.Checked = (StatusEnum)int.Parse(e.Data) == StatusEnum.ON;
                        }));
                        break;
                    default:
                        break;
                }
            }));
        }


        private void ObservableActValueChangeAsync()
        {
            //Init get act value first time
            _firebaseService.ObservableValueChange($"{Constants.ACT_VALUE_ROOT}", (response) =>
            {
                switch (response.Path.Replace("/", "").Trim())
                {
                    case Constants.LIGHT:
                        gaugeLight.Value = int.Parse(response.Data);
                        break;
                    case Constants.TEMPERATURE:
                        gaugeTemp.Value = int.Parse(response.Data);
                        break;
                    case Constants.RAIN:
                        bool.TryParse(response.Data, out bool isRain);
                        imgRain.Image = isRain ? Properties.Resources.raining : Properties.Resources.cloudy__1_;
                        break;
                    case Constants.SOIL:
                        gaugeHumidity.Value = int.Parse(response.Data);
                        break;
                    case Constants.PUMP:
                        togglePump.Invoke(new Action(() =>
                        {
                            togglePump.Checked = (StatusEnum)int.Parse(response.Data) == StatusEnum.ON;
                            imgPump.Image = (StatusEnum)int.Parse(response.Data) == StatusEnum.ON ? Properties.Resources.pump_on : Properties.Resources.pump_off;
                        }));
                        break;
                    case Constants.MOTOR:
                        toggleMotor.Invoke(new Action(() =>
                        {
                            toggleMotor.Checked = (StatusEnum)int.Parse(response.Data) == StatusEnum.ON;
                            imgMotor.Image = (StatusEnum)int.Parse(response.Data) == StatusEnum.ON ? Properties.Resources.motor_on : Properties.Resources.motor_off;
                        }));
                        break;
                    case Constants.WARM:
                        toggleWarm.Invoke(new Action(() =>
                        {
                            toggleWarm.Checked = (StatusEnum)int.Parse(response.Data) == StatusEnum.ON;
                            imgWarm.Image = (StatusEnum)int.Parse(response.Data) == StatusEnum.ON ? Properties.Resources.warm_on : Properties.Resources.warm_off;
                        }));
                        break;
                    default:
                        return;
                }

            });
        }


        //Handle MultiThread when observable value change
        private void OnMultiThread(Action action)
        {
            Thread thread = new Thread(new ThreadStart(() =>
            {
                action();
            }));
            thread.Start();
        }

        private bool CheckValidLimit(LimitSetting setting)
        {
            if( setting == null || setting.High <= setting.Low)
            {
                MessageBox.Show("Giá trị thiết lập không hợp lệ.\n Vui lòng kiểm tra lại!","Error",MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }
            return true;
        }


        private async void btnSetLimitSoil_ClickAsync(object sender, EventArgs e)
        {
            var limit = new LimitSetting()
            {
                High = slideHightSoil.Value,
                Low = slideLowSoil.Value
            };
            if (!CheckValidLimit(limit)) return;
            bool result = await _firebaseService.SetValue<int>($"{Constants.SETTING_LIMIT_SOIL}/High", slideHightSoil.Value);
            result = await _firebaseService.SetValue<int>($"{Constants.SETTING_LIMIT_SOIL}/Low", slideLowSoil.Value);
            MessageBox.Show(result? "Thiết lập giá trị thành công" : "Thiết lập giá trị thất bại");
        }

        private async void btnSetLimitLight_Click(object sender, EventArgs e)
        {
            var limit = new LimitSetting()
            {
                High = slideHightLight.Value,
                Low = slideLowLight.Value
            };
            if (!CheckValidLimit(limit)) return;
            bool result = await _firebaseService.SetValue<int>($"{Constants.SETTING_LIMIT_LIGHT}/High", slideHightLight.Value);
            result = await _firebaseService.SetValue<int>($"{Constants.SETTING_LIMIT_LIGHT}/Low", slideLowLight.Value);
            MessageBox.Show(result ? "Thiết lập giá trị thành công" : "Thiết lập giá trị thất bại");
        }

        private async void btnSetLimitTemp_Click(object sender, EventArgs e)
        {
            var limit = new LimitSetting()
            {
                High = slideHighTemp.Value,
                Low = slideLowTemp.Value
            };
            if (!CheckValidLimit(limit)) return;
            bool result = await _firebaseService.SetValue($"{Constants.SETTING_LIMIT_TEMPERATURE}/High", slideHighTemp.Value);
            result = await _firebaseService.SetValue($"{Constants.SETTING_LIMIT_TEMPERATURE}/Low", slideLowTemp.Value);
            MessageBox.Show(result ? "Thiết lập giá trị thành công" : "Thiết lập giá trị thất bại");
        }

        private async void btnSetLimitHumi_Click(object sender, EventArgs e)
        {
            //var limit = new LimitSetting()
            //{
            //    High = slideHighHumi.Value,
            //    Low = slideLowHumi.Value
            //};
            //if (!CheckValidLimit(limit)) return;
            //bool result = await _firebaseService.SetValue<LimitSetting>(Constants.SETTING_LIMIT_HUMIDITY, limit);
            //MessageBox.Show(result ? "Thiết lập giá trị thành công" : "Thiết lập giá trị thất bại");
        }

        private void slideHightSoil_ValueChanged(object sender, Utilities.BunifuSlider.BunifuHScrollBar.ValueChangedEventArgs e)
        {
            txtHighSoilLimit.Text = e.Value.ToString();
        }

        private void slideHighTemp_ValueChanged(object sender, Utilities.BunifuSlider.BunifuVScrollBar.ValueChangedEventArgs e)
        {
            txtHighTempLimit.Text = e.Value.ToString();
        }

        private void slideLowSoil_ValueChanged(object sender, Utilities.BunifuSlider.BunifuHScrollBar.ValueChangedEventArgs e)
        {
            txtLowSoilLimit.Text = e.Value.ToString();
        }

        private void slideLowSoil_Load(object sender, EventArgs e)
        {
            txtLowSoilLimit.Text = slideLowSoil.Value.ToString();
        }

        private void slideHightLight_ValueChanged(object sender, Utilities.BunifuSlider.BunifuHScrollBar.ValueChangedEventArgs e)
        {
            txtHighLightLimit.Text = e.Value.ToString();
        }

        private void slideLowLight_ValueChanged(object sender, Utilities.BunifuSlider.BunifuHScrollBar.ValueChangedEventArgs e)
        {
            txtLowLightLimit.Text = e.Value.ToString();
        }

        private void slideLowTemp_ValueChanged(object sender, Utilities.BunifuSlider.BunifuVScrollBar.ValueChangedEventArgs e)
        {
            txtLowTempLimit.Text = e.Value.ToString();
        }

        private void slideHighHumi_ValueChanged(object sender, Utilities.BunifuSlider.BunifuHScrollBar.ValueChangedEventArgs e)
        {
            //txtHighHumiLimit.Text = e.Value.ToString();
        }

        private void slideLowHumi_ValueChanged(object sender, Utilities.BunifuSlider.BunifuHScrollBar.ValueChangedEventArgs e)
        {
            //txtLowHumiLimit.Text = e.Value.ToString();
        }

        private void historybtn_Click(object sender, EventArgs e)
        {
            var formHistory = new History();
            formHistory.Show();
        }

        private void exitbtn_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private async void modeToggle_CheckedChanged(object sender, BunifuToggleSwitch.CheckedChangedEventArgs e)
        {
            await _firebaseService.SetValue(Constants.SETTING_MODE, e.Checked ? StatusEnum.ON: StatusEnum.OFF);
        }

        private async void toggleWarm_CheckedChanged(object sender, BunifuToggleSwitch.CheckedChangedEventArgs e)
        {
            await _firebaseService.SetValue($"{Constants.SETTING_MANUAL}/{Constants.WARM}", e.Checked ? StatusEnum.ON : StatusEnum.OFF);
        }

        private async void togglePump_CheckedChanged(object sender, BunifuToggleSwitch.CheckedChangedEventArgs e)
        {
            await _firebaseService.SetValue($"{Constants.SETTING_MANUAL}/{Constants.PUMP}", e.Checked ? StatusEnum.ON : StatusEnum.OFF);

        }

        private async void toggleMotor_CheckedChanged(object sender, BunifuToggleSwitch.CheckedChangedEventArgs e)
        {
            await _firebaseService.SetValue($"{Constants.SETTING_MANUAL}/{Constants.MOTOR}", e.Checked ? StatusEnum.ON : StatusEnum.OFF);
        }

        private void btnVirtualForm_Click(object sender, EventArgs e)
        {
            var form = new VirtualForm();
            form.ShowDialog();
        }
    }
}
