using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TrainDigramDataConverter
{
    [Serializable]
    public class TrainStop
    {
        public String stationName;
        public String arriveTime;
        public String leaveTime;

        public TrainStop(string stationName, string arriveTime, string leaveTime) {
            this.stationName = stationName;
            this.arriveTime = arriveTime;
            this.leaveTime = leaveTime;
        }

        public String getStationName() {
            return this.stationName;
        }

        public String getArriveTime() {
            return this.arriveTime;
        }

        public String getLeaveTime() {
            return this.leaveTime;
        }
    }
}
