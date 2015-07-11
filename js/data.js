/*
* Create By Quillblue on 2015-7-6
* Data Config File
*/

//运行图名称
var MapTitle="Name Here";

//输出分片设置
var STARTHOUR=18;
var ENDHOUR=20;

//越行标注开关
var MARK_ARRIVAL_ON_DEPATURE=true;

/*客里表信息*/
//主线信息
var StationData=[{name:"上海",uniqueName:"上海",position:0},
				{name:"上海虹桥",uniqueName:"上海虹桥",position:33},
				{name:"春申线路所",uniqueName:"春申线路所",position:52},
				{name:"松江南",uniqueName:"松江南",position:64},
				{name:"金山北",uniqueName:"金山北",position:81},
				{name:"嘉善南",uniqueName:"嘉善南",position:100},
				{name:"嘉兴南",uniqueName:"嘉兴南",position:117},
				{name:"桐乡",uniqueName:"桐乡",position:145},
				{name:"海宁西",uniqueName:"海宁西",position:166},
				{name:"余杭",uniqueName:"余杭",position:177},
				{name:"笕桥线路所",uniqueName:"笕桥线路所(杭州东方向)",position:179},
				{name:"杭州东",uniqueName:"杭州东",position:192}];

//支线信息
var SubLineStationData=[[{name:"笕桥线路所",uniqueName:"笕桥线路所(笕桥方向)",position:0},
				{name:"笕桥",uniqueName:"笕桥",position:19},
				{name:"杭州",uniqueName:"杭州",position:25}]];

//运行图信息
var TrainData=[{trainNo:"G7363",
				type:"G",
				direction:1,
				depature:"上海",
				arrival:"杭州",
				stops:[{stationName:"上海",arriveTime:"",leaveTime:"18:00"},
				{stationName:"上海虹桥",arriveTime:"18:25",leaveTime:"18:29"},
				{stationName:"嘉兴南",arriveTime:"18:59",leaveTime:"19:01"},
				{stationName:"笕桥线路所(杭州东方向)",arriveTime:"",leaveTime:"19:23"},
				{stationName:"笕桥线路所(笕桥方向)",arriveTime:"",leaveTime:"19:23"},
				{stationName:"杭州",arriveTime:"19:33",leaveTime:""}]},
				{trainNo:"D379",
				type:"D",
				direction:1,
				depature:"上海虹桥",
				arrival:"厦门北",
				stops:[{stationName:"上海虹桥",arriveTime:"",leaveTime:"17:43"},
				{stationName:"松江南",arriveTime:"",leaveTime:"17:55"},
				{stationName:"嘉兴南",arriveTime:"18:21",leaveTime:"19:24"},
				{stationName:"杭州东",arriveTime:"19:59",leaveTime:"20:05"}]},
				{trainNo:"D2283",
				type:"D",
				direction:1,
				depature:"成都",
				arrival:"杭州东",
				stops:[
				{stationName:"上海虹桥",arriveTime:"18:05",leaveTime:"18:09"},
				{stationName:"嘉兴南",arriveTime:"18:37",leaveTime:"18:42"},
				{stationName:"杭州东",arriveTime:"19:08",leaveTime:""}]}
]
