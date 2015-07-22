using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;

namespace TrainDigramDataConverter
{
    public class ExcelReader
    {
        public List<TrainData> Read(String filePath, int direction)
        {
            List<TrainData> resultList = new List<TrainData>();
            if (filePath == null || filePath == "") { throw new Exception("文件为空"); }
            String sConnectionString = "Provider=Microsoft.Jet.OleDb.4.0;" + "data source=" + filePath + ";Extended Properties='Excel 8.0; HDR=yes; IMEX=0'"; ;
            OleDbConnection objConn = new OleDbConnection(sConnectionString);
            objConn.Open();
            OleDbCommand objCmdSelect = new OleDbCommand("SELECT * FROM [Sheet1$]", objConn);
            OleDbDataAdapter objAdapter = new OleDbDataAdapter();
            objAdapter.SelectCommand = objCmdSelect;
            DataSet workListDataset = new DataSet();
            objAdapter.Fill(workListDataset);
            Dictionary<int, String> stationDict = new Dictionary<int, string>();
            for (int i = 1; i < workListDataset.Tables[0].Rows.Count; i+=2)
            {
                String stationName=workListDataset.Tables[0].Rows[i][0].ToString();
                if (stationName!="") {
                    stationDict.Add(i, stationName);
                    stationDict.Add(i + 1, stationName);
                }
            }
            for (int i = 1; i < workListDataset.Tables[0].Columns.Count; i++)
            {
                String trainNo = workListDataset.Tables[0].Columns[i].ColumnName;
                TrainData td = new TrainData(trainNo, DecideType(trainNo), direction);
                TimeReader timeReader = new TimeReader();
                if (direction == 1)
                {
                    for (int j = 1; j < stationDict.Count + 1; j+=2) {
                        String stationName = stationDict[j];
                        String arriveTime = timeReader.ConvertTime(workListDataset.Tables[0].Rows[j][i].ToString());
                        String leaveTime = timeReader.ConvertTime(workListDataset.Tables[0].Rows[j+1][i].ToString());
                        if (arriveTime != "" || leaveTime != "") { 
                            td.AddStop(stationName, arriveTime, leaveTime);
                        }
                    }
                }
                else
                {
                    for (int j = stationDict.Count; j > 0; j-=2)
                    {
                        String stationName = stationDict[j];
                        String arriveTime = timeReader.ConvertTime(workListDataset.Tables[0].Rows[j][i].ToString());
                        String leaveTime = timeReader.ConvertTime(workListDataset.Tables[0].Rows[j - 1][i].ToString()); 
                        if (arriveTime != "" || leaveTime != "")
                        {
                            td.AddStop(stationName, arriveTime, leaveTime);
                        }
                    }
                }
                resultList.Add(td);
            }
            return resultList;
        }

        private String DecideType(String trainNo)
        {
            if (trainNo.StartsWith("DJ")) { return "DJ"; }
            if (char.IsLetter(trainNo[0]) || trainNo.StartsWith("0")) { return trainNo[0].ToString(); }
            if (trainNo.Length < 5) { return "客"; }
            else {
                if (trainNo.Substring(0, 1) == "5") { return "路用"; }
                else{return "货";} 
            }
        }

    }

}
