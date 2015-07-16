using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TrainDigramDataConverter
{
    public class TimeReader
    {
        private String defaultHour;

        public TimeReader() {
            this.defaultHour = "0";
        }

        public String ConvertTime(String inputTime) {
            inputTime = inputTime.Trim();
            if (inputTime == "--") { return ""; }
            if (inputTime == "..." || inputTime == "") { return inputTime; }
            if (inputTime.Split(':').Length > 1)
            {
                defaultHour = inputTime.Split(':')[0];
                if (inputTime.Split(':')[1].Length > 2)
                {
                    return defaultHour + ":" + inputTime.Split(':')[1].Substring(0, 2) + ":" + inputTime.Split(':')[1].Substring(2);
                }
                else {
                    return inputTime;
                }
            }
            else {
                if (inputTime.Length > 2)
                {
                    return defaultHour + ":" + inputTime.Substring(0, 2) + ":" + inputTime.Substring(2);
                }
                else
                {
                    return defaultHour + ":" + inputTime;
                }
            }
        }
    }
}
