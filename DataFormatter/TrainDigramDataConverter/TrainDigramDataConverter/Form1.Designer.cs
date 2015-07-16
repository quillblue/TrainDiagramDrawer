namespace TrainDigramDataConverter
{
    partial class TrainDigramDataConverter
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.textBoxResult = new System.Windows.Forms.TextBox();
            this.textBoxDownFilePath = new System.Windows.Forms.TextBox();
            this.textBoxUpFilePath = new System.Windows.Forms.TextBox();
            this.buttonDownFile = new System.Windows.Forms.Button();
            this.buttonUpFile = new System.Windows.Forms.Button();
            this.buttonStart = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 50);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(65, 12);
            this.label1.TabIndex = 0;
            this.label1.Text = "上行时刻表";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 23);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(65, 12);
            this.label2.TabIndex = 1;
            this.label2.Text = "下行时刻表";
            // 
            // textBoxResult
            // 
            this.textBoxResult.Location = new System.Drawing.Point(14, 74);
            this.textBoxResult.Multiline = true;
            this.textBoxResult.Name = "textBoxResult";
            this.textBoxResult.ReadOnly = true;
            this.textBoxResult.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.textBoxResult.Size = new System.Drawing.Size(522, 262);
            this.textBoxResult.TabIndex = 2;
            // 
            // textBoxDownFilePath
            // 
            this.textBoxDownFilePath.Location = new System.Drawing.Point(83, 20);
            this.textBoxDownFilePath.Name = "textBoxDownFilePath";
            this.textBoxDownFilePath.ReadOnly = true;
            this.textBoxDownFilePath.Size = new System.Drawing.Size(294, 21);
            this.textBoxDownFilePath.TabIndex = 3;
            // 
            // textBoxUpFilePath
            // 
            this.textBoxUpFilePath.Location = new System.Drawing.Point(83, 47);
            this.textBoxUpFilePath.Name = "textBoxUpFilePath";
            this.textBoxUpFilePath.ReadOnly = true;
            this.textBoxUpFilePath.Size = new System.Drawing.Size(294, 21);
            this.textBoxUpFilePath.TabIndex = 4;
            // 
            // buttonDownFile
            // 
            this.buttonDownFile.Location = new System.Drawing.Point(383, 18);
            this.buttonDownFile.Name = "buttonDownFile";
            this.buttonDownFile.Size = new System.Drawing.Size(44, 23);
            this.buttonDownFile.TabIndex = 5;
            this.buttonDownFile.Text = "浏览";
            this.buttonDownFile.UseVisualStyleBackColor = true;
            this.buttonDownFile.Click += new System.EventHandler(this.buttonDownFile_Click);
            // 
            // buttonUpFile
            // 
            this.buttonUpFile.Location = new System.Drawing.Point(383, 47);
            this.buttonUpFile.Name = "buttonUpFile";
            this.buttonUpFile.Size = new System.Drawing.Size(44, 23);
            this.buttonUpFile.TabIndex = 6;
            this.buttonUpFile.Text = "浏览";
            this.buttonUpFile.UseVisualStyleBackColor = true;
            this.buttonUpFile.Click += new System.EventHandler(this.buttonUpFile_Click);
            // 
            // buttonStart
            // 
            this.buttonStart.Font = new System.Drawing.Font("宋体", 10.5F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.buttonStart.Location = new System.Drawing.Point(443, 20);
            this.buttonStart.Name = "buttonStart";
            this.buttonStart.Size = new System.Drawing.Size(93, 48);
            this.buttonStart.TabIndex = 7;
            this.buttonStart.Text = "开始";
            this.buttonStart.UseVisualStyleBackColor = true;
            this.buttonStart.Click += new System.EventHandler(this.buttonStart_Click);
            // 
            // TrainDigramDataConverter
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(548, 337);
            this.Controls.Add(this.buttonStart);
            this.Controls.Add(this.buttonUpFile);
            this.Controls.Add(this.buttonDownFile);
            this.Controls.Add(this.textBoxUpFilePath);
            this.Controls.Add(this.textBoxDownFilePath);
            this.Controls.Add(this.textBoxResult);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "TrainDigramDataConverter";
            this.Text = "TrainDigramDataConverter";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox textBoxResult;
        private System.Windows.Forms.TextBox textBoxDownFilePath;
        private System.Windows.Forms.TextBox textBoxUpFilePath;
        private System.Windows.Forms.Button buttonDownFile;
        private System.Windows.Forms.Button buttonUpFile;
        private System.Windows.Forms.Button buttonStart;
    }
}

