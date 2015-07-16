using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace TrainDigramDataConverter
{
    public partial class TrainDigramDataConverter : Form
    {
        public TrainDigramDataConverter()
        {
            InitializeComponent();
        }

        private void buttonDownFile_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Filter = "Excel97-03文件|*.xls";
            if (ofd.ShowDialog() == DialogResult.OK)
            {
                textBoxDownFilePath.Text = ofd.FileName;
            }
        }

        private void buttonUpFile_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Filter = "Excel97-03文件|*.xls";
            if (ofd.ShowDialog() == DialogResult.OK)
            {
                textBoxUpFilePath.Text = ofd.FileName;
            }
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            textBoxResult.Text = "";
            
            try
            {
                String downTrainData = convert(textBoxDownFilePath.Text, 1);
                textBoxResult.Text += "var DownTrainData=" + downTrainData + "\n";
            }
            catch (Exception ee) {
                textBoxResult.Text +="下行数据转换失败：\n"+ ee.Message;
            }
            textBoxResult.Text += "\n";
            try
            {
                String upTrainData = convert(textBoxUpFilePath.Text, -1);
                textBoxResult.Text += "var DownTrainData=" + upTrainData + "\n";
            }
            catch (Exception ee)
            {
                textBoxResult.Text += "上行数据转换失败：\n" + ee.Message;
            }
        }

        private String convert(String filePath, int direction) {
            ExcelReader er = new ExcelReader();
            List<TrainData> trainDataList = er.Read(filePath, direction);
            return JsonConvert.SerializeObject(trainDataList);
        }
    }
}
