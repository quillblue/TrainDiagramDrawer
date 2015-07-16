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

//上下行筛选开关 0:双向 1:下行 -1:上行
var DIRECTION_FILTER=0;

/*客里表信息*/
//里程表信息可以使用dataTemplate中的模板（推荐，如下图所示），亦可以自己定义
//主线信息
var StationData=LINEDATA_HUKUNHIGHWAY_HUHANG.StationData;

//支线接算站{接算站:主线下一站}
var SubLineConnectionStation=LINEDATA_HUKUNHIGHWAY_HUHANG.SubLineConnectionStation;

//支线信息，无支线时定义为[]
var SubLineStationData=LINEDATA_HUKUNHIGHWAY_HUHANG.SubLineStationData;


/*运行图信息*/
//下行列车
var DownTrainData=[{trainNo:"G7363",
				type:"G",
				direction:1,
				stops:[{stationName:"上海",arriveTime:"",leaveTime:"18:00"},
				{stationName:"上海虹桥",arriveTime:"18:25",leaveTime:"18:29"},
				{stationName:"笕桥线路所",arriveTime:"...",leaveTime:"19:24"},
				{stationName:"笕桥",arriveTime:"...",leaveTime:"19:25"},
				{stationName:"杭州",arriveTime:"19:33",leaveTime:""}]},
				{trainNo:"D379",
				type:"D",
				direction:1,
				stops:[{stationName:"上海虹桥",arriveTime:"",leaveTime:"17:43"},
				{stationName:"松江南",arriveTime:"",leaveTime:"17:55"},
				{stationName:"嘉兴南",arriveTime:"18:21",leaveTime:"19:24"},
				{stationName:"杭州东",arriveTime:"19:59",leaveTime:"20:05"}]}
];

//上行列车
var UpTrainData=[];
