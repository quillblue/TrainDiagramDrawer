# TrainDigram

基于[d3.js](http://www.d3js.org)的铁路列车运行图辅画工具，应邀约开发。

内含基于.NET Framework将特定格式的时刻表Excel文件转化为指定格式Json字符串的工具（`/DataFormatter`）

### 配置项

`js/data.js` : 存放线路里程、列车时刻和默认配置项（输出分片、标注选项等）

`js/datatemplate.js` : 存放可供`js/data.js`复用的线路里程

`js/main.js` : 存放用于运行图辅画但无需被经常修改的配置项

### 使用
1. 手工编辑输入线路里程数据

2. 使用DataFormatter生成运行时刻数据

3. 在浏览器中打开`index.html`

### HTTP QueryString API
本Repo支持在不修改js文件的情况下在浏览器地址栏中使用QueryString进行运行图辅画的部分设置，它们包括：

||参数名||解释||可选值||默认值||	
||`start`|| 输出的运行图分片开始时间||0~24||18||
||`end`||输出的运行图分片结束时间||0~24||18||
||`stoptime`||是否在运行图上标注停车时间（以方便在打印时能够辨别越行情况）||on/off||off||
||`direction`||显示上行/下行方向的运行图||up/down/all||all||

