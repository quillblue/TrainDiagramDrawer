/*
* Create By Quillblue on 2015-7-6
* Data Config File
*/

//运行图名称
var MapTitle="Name Here";

//输出分片设置
var STARTHOUR=18;
var ENDHOUR=19;

//客里表信息
var StationData=[{name:"上海",position:0},{name:"上海虹桥综合场",position:33},{name:"春申线路所",position:52},{name:"松江南",position:64},{name:"金山北",position:81},{name:"嘉善南",position:100},{name:"嘉兴南",position:117},{name:"桐乡",position:145},{name:"海宁西",position:166},{name:"余杭",position:177},{name:"杭州东",position:192},{name:"杭州",position:202}];

//运行图信息
var TrainData=[{trainNo:"G7363",
				type:"G",
				direction:1,
				depature:"上海",
				arrival:"杭州",
				stops:[{stationName:"上海",arriveTime:"",leaveTime:"17:53"},
				{stationName:"上海虹桥综合场",arriveTime:"18:35",leaveTime:"18:39"},
				{stationName:"嘉兴南",arriveTime:"19:07",leaveTime:"20:02"},
				{stationName:"杭州",arriveTime:"20:32",leaveTime:""}]
			}
]
