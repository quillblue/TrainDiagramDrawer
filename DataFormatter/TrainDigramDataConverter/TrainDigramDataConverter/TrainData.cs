using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace TrainDigramDataConverter
{
    [Serializable]
    public class TrainData
    {
        public String trainNo{get;private set;}
        public String type { get; private set; }
        public int direction { get; private set; }
        public List<TrainStop> stops { get; private set; }

        public TrainData(string trainNo, string type, int direction) {
            this.trainNo = trainNo;
            this.type = type;
            this.direction = direction;
            this.stops = new List<TrainStop>();
        }

        public void AddStop(string stationName, string arriveTime, string leaveTime) {
            TrainStop ts = new TrainStop(stationName,arriveTime,leaveTime);
            this.stops.Add(ts);
        }

    }
}
