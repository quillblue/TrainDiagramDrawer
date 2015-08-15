# TrainDigram

基于[d3.js](http://www.d3js.org)的铁路列车运行图辅画工具，应邀约开发。

内含基于.NET Framework将特定格式的时刻表Excel文件转化为指定格式Json字符串的工具（`/DataFormatter`）

## DEMO
[沪昆高铁沪杭段运行图（2015七一运行图）](http://quillblue.com/traindigram/index.html)

## 配置项

`js/data.js` : 存放线路里程、列车时刻和默认配置项（输出分片、标注选项等）

`js/datatemplate.js` : 存放可供`js/data.js`复用的线路里程

`js/main.js` : 存放用于运行图辅画但无需被经常修改的配置项

## 使用
1. 手工编辑输入线路里程数据

2. 使用DataFormatter生成运行时刻数据

3. 在浏览器中打开`index.html`

## HTTP QueryString API
本Repo支持在不修改js文件的情况下在浏览器地址栏中使用QueryString进行运行图辅画的部分设置，它们包括：

<table>
<tr><td>参数名</td><td>解释</td><td>可选值</td><td>默认值</td></tr>
<tr><td>start</td><td>输出的运行图分片开始时间</td><td>0~24</td><td>18</td></tr>
<tr><td>end</td><td>输出的运行图分片结束时间</td><td>0~24</td><td>18</td></tr>
<tr><td>stoptime</td><td>是否在运行图上标注停车时间（以方便在打印时能够辨别越行情况）</td><td>on/off</td><td>off</td></tr>
<tr><td>direction</td><td>显示上行/下行方向的运行图</td><td>up/down/all</td><td>all</td></tr>
</table>


