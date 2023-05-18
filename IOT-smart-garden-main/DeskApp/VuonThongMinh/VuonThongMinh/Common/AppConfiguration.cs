using System.Configuration;

namespace VuonThongMinh.Common
{
    public static class AppConfiguration
    {
        public static string SecretKey
        {
            get
            {
                return ConfigurationManager.AppSettings["SecretKeyFirebase"];
            }
        }
        public static string BaseUrlFirebase
        {
            get
            {
                return ConfigurationManager.AppSettings["BaseUrlFirebase"];
            }
        }
        public static string ProjectName
        {
            get
            {
                return ConfigurationManager.AppSettings["ProjectName"];
            }
        }
    }
}
