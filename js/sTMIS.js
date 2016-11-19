/* Global Config*/
// 第一条时间线距画布左侧的距离
var LEFTMARGIN=10;
// 1分钟格格宽度
var TIMEINTERVAL=6;
// 符号标记单位
var SYMBOLUNIT=5;

var EXTEND_LENGTH_UINT=15;
// 运行图第一站横线距离画布顶端的距离
var TOPMARGEIN=80;
// 运行图高度
var MAPHEIGHT=1000;
// 画布
var svg=d3.select("#map");
// 站名画布
var svgStation=d3.select("#stationCanvas");
// 里程表中最小里程
var MINPOS=0;
// 里程表中最大里程
var MAXPOS=0;
// 运行图分片宽度（默认24小时）
var MAPHOURLENGTH=24;
// 站名词典
var StationDictionary=new Object();
// 运行线宽度
var TRAINLINE_WIDTH="1";

var STATION_DATA, SUBLINE_CONNECTION_DATA, SUBLINE_STATION_DATA;

var DOWN_TRAIN_DATA, UP_TRAIN_DATA;

//Intialize Functions
$(document).ready(function(){
	lineTree.init();
	canvasInitialize('JINGHU_XUBENG');
	$('#checkSideNavShow').change(function(){
		if(document.getElementById('checkSideNavShow').checked){
			$('#sideNav').show();
		}
		else{
			$('#sideNav').hide();
		}
	})
	$('#btnRefresh').click(function(){
		STARTHOUR=parseInt($('#startTimeSelect').val());
		ENDHOUR=parseInt($('#endTimeSelect').val());
		DIRECTION_FILTER= parseInt($('#direction').val());
		canvasInitialize()
	});
	// if(DIRECTION_FILTER>=0){
	// 	for(j=0;j<DownTrainData.length;j++){
	// 		drawTrain(DownTrainData[j]);
	// 	}
	// }
	// if(DIRECTION_FILTER<=0){
	// 	for(j=0;j<UpTrainData.length;j++){
	// 		drawTrain(UpTrainData[j]);
	// 	}
	// }
})

//更新整个运行图区域（切换线路.时间范围）
function canvasInitialize(lineName){
	$(".digram").remove();
	$(".baseGrid").remove();
	if(lineName){
		$.ajax({
  			url: 'data/'+lineName+'.json',
  			success: function(data){
  				STATION_DATA=data.StationData;
  				SUBLINE_STATION_DATA=data.SubLineStationData;
  				SUBLINE_CONNECTION_DATA=data.SublineConnectionData;
  				UP_TRAIN_DATA=data.UpTrainData;
  				DOWN_TRAIN_DATA=data.DOWN_TRAIN_DATA;
  				initStationDictionary();
				initSpaceIndicator();
  			},
  			dataType: 'json',
  			error:function(){
  				alert('获取相关线路信息出错')
  			}
		});
	}
	MAPHOURLENGTH=ENDHOUR==STARTHOUR?24:(ENDHOUR-STARTHOUR+24)%24;
	$("#map").attr("width",MAPHOURLENGTH*60*TIMEINTERVAL+LEFTMARGIN+50+"px");
	$("#map").css("height",MAPHEIGHT+150);
	$("#stationCanvas").css("height",MAPHEIGHT+150);
	drawTimeLine();
	drawStationLine();
	switch(direction){
		case 1:$(".upTrain").hide();$(".downTrain").show();break;
		case -1:$(".downTrain").hide();$(".upTrain").show();break;
		case 0:$(".trainLine").show();
	}
}


//更新上下行筛选
function directionFilterChange(direction){
	switch(direction){
		case 1:$(".upTrain").hide();$(".downTrain").show();break;
		case -1:$(".downTrain").hide();$(".upTrain").show();break;
		case 0:$(".trainLine").show();
	}
}


//初始化站名词典
function initStationDictionary(){
	var StationDictionary=new Object();
	MINPOS=StationData[0].position;
	MAXPOS=StationData[StationData.length-1].position;
	for(i=0;i<StationData.length;i++){
		StationDictionary[StationData[i].uniqueName]=StationData[i].position;
	}
	for(i=0;i<SubLineStationData.length;i++){
		var subline=SubLineStationData[i];
		if(SubLineStationData[i].direction==1){
			MAXPOS+=30;
			for(j=0;j<subline.stations.length;j++){
				StationDictionary[subline.stations[j].uniqueName]=subline.stations[j].position+MAXPOS;
			}
			MAXPOS=MAXPOS+subline.stations[subline.stations.length-1].position;
		}
		else{
			MINPOS-=30;
			for(j=0;j<subline.stations.length;j++){
				StationDictionary[subline.stations[j].uniqueName]=MINPOS-subline.stations[j].position;
			}
			MINPOS=MINPOS-subline.stations[subline.stations.length-1].position;
		}
	}
}

//初始化空间占用指示
function initSpaceIndicator(){
	var stationList=StationData;
	for(i=0;i<SubLineStationData.length;i++){
		stationList=stationList.concat(SubLineStationData[i].stations);
	}
	SpaceIndicator.init(stationList);
}

/* 运行图底图绘制函数 */
//时间线绘制逻辑
function drawTimeLine(){
	//时间轴基线
	svg.append("line")
		.attr("class","baseGrid timeLine")
		.style("stroke","#090")
		.style("stroke-width","1px")
		.attr("x1",LEFTMARGIN)
		.attr("x2",LEFTMARGIN+TIMEINTERVAL*6*MAPHOURLENGTH*10)
		.attr("y1",30)
		.attr("y2",30)
		.attr("stroke-dasharray","2 0")
	for(i=0;i<=6*MAPHOURLENGTH;i++){
		//确定时间竖线类型
		var type="10min"
		if(i%6==0){type="hour"}
		else{
			if(i%3==0){type="30min"}
		}
		//时间竖线
		svg.append("line")
			.attr("class","baseGrid timeLine")
			.style("stroke","#090")
			.style("stroke-width",type=="hour"?"2px":"1px")
			.attr("x1",LEFTMARGIN+TIMEINTERVAL*i*10)
			.attr("x2",LEFTMARGIN+TIMEINTERVAL*i*10)
			.attr("y1",TOPMARGEIN)
			.attr("y2",TOPMARGEIN+MAPHEIGHT)
			.attr("stroke-dasharray","2 0")
		//时间轴交叉线
		svg.append("line")
			.attr("class","baseGrid timeLine")
			.style("stroke","#090")
			.style("stroke-width",type=="hour"?"2px":"1px")
			.attr("x1",LEFTMARGIN+TIMEINTERVAL*i*10)
			.attr("x2",LEFTMARGIN+TIMEINTERVAL*i*10)
			.attr("y1",20)
			.attr("y2",36)
		//时间轴文字
		if(type=="hour"){
			var hourNo=(STARTHOUR+i/6)%24;
			svg.append("text")
				.attr("class","baseGrid timeLine")
				.text(hourNo)
				.style("fill","#090")
				.style("font-size",14)
				.attr("x",LEFTMARGIN+TIMEINTERVAL*i*10-(hourNo<10?4.5:8.5))
				.attr("y",15);
		}
		else{
			svg.append("text")
				.attr("class","baseGrid timeLine")
				.text(i%6*10)
				.style("fill","#666")
				.style("font-size",12)
				.attr("x",LEFTMARGIN+TIMEINTERVAL*i*10-7)
				.attr("y",15);
		}
	}
}

//时间线类型辅助类
function timeLineColor(type){
	switch(type){
		case "hour":return "#093";
		case "10min":return "#093";
		default:return "#fff";
	}
}

function drawStationLine(){
	for(i=0;i<StationData.length;i++){
		svg.append("line")
			.attr("class","baseGrid stationLine")
			.style("stroke","#090")
			.attr("x1",LEFTMARGIN)
			.attr("x2",LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL)
			.attr("y1",convertStationToYCoordinate(StationData[i].uniqueName))
			.attr("y2",convertStationToYCoordinate(StationData[i].uniqueName));
		svgStation.append("text")
			.attr("class","stationName")
			.text(StationData[i].name)
			.attr("x",50-StationData[i].name.length*6)
			.attr("y",convertStationToYCoordinate(StationData[i].uniqueName)+4);
	}
	for(i=0;i<SubLineStationData.length;i++){
		var subline=SubLineStationData[i];
		for(j=0;j<subline.stations.length;j++){
			svg.append("line")
				.attr("class","baseGrid stationLine")
				.style("stroke","#090")
				.attr("x1",LEFTMARGIN)
				.attr("x2",LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL)
				.attr("y1",convertStationToYCoordinate(subline.stations[j].uniqueName))
				.attr("y2",convertStationToYCoordinate(subline.stations[j].uniqueName));
			svgStation.append("text")
				.attr("class","stationName")
				.text(subline.stations[j].name)
				.attr("x",50-subline.stations[j].name.length*6)
				.attr("y",convertStationToYCoordinate(subline.stations[j].uniqueName)+4);
		}
	}
}

function drawTrain(){

}

/// Functions for draw Train line
function drawStartSymbol(){

}

function drawInMapSymbol(){

}

function drawOutMapSymbol(){

}

///Helper Functions
//时刻->数字
function convertTimeToFloat(time){
	var hour=parseFloat(time.split(":")[0]);
	var minute=parseFloat(time.split(":")[1]);
	var returnFloat=hour+minute/60;
	if(time.split(":").length==3){returnFloat+=parseInt(time.split(":")[2])/3600;}
	return returnFloat;
}

//时刻->svg x坐标
function convertTimeToXCoordinate(time,drawOnFinalLine){
	var timeFloat=convertTimeToFloat(time);
	timeFloat-=STARTHOUR;
	if(timeFloat<0){timeFloat+=24;}
	var returnX=timeFloat*60*TIMEINTERVAL+LEFTMARGIN;
	if(returnX==LEFTMARGIN&&STARTHOUR==ENDHOUR&&drawOnFinalLine){return MAPHOURLENGTH*60*TIMEINTERVAL+LEFTMARGIN;}
	return returnX;
}

//站名->svg y坐标
function convertStationToYCoordinate(stationName){
	return (StationDictionary[stationName]-MINPOS)/(MAXPOS-MINPOS)*MAPHEIGHT+TOPMARGEIN;
}

//(时刻,站名)->判断坐标点是否在图内
function decidePointInMap(time,stationName){
	var point=convertTimeAndStationToCoordinate(time,stationName);
	return (point.x>=LEFTMARGIN&&point.x<=LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL)&&(point.y>=TOPMARGEIN&&point.y<=TOPMARGEIN+MAPHEIGHT);
}

//时刻->坐标点是否在图内
function decidePointInMapByPointX(pointX){
	return pointX>=LEFTMARGIN&&pointX<=(LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL);
}

//是否为支线站
function isStationOnSubline(stationName){
	for(l=0;l<SubLineStationData.length;l++){
		for(m=1;m<SubLineStationData[l].stations.length;m++){
			if(SubLineStationData[l].stations[m].name==stationName){return true;}
		}
	}
	return false;
}

//获取queryString
function getQueryString(name){
	name="?"+name;
	var reg=new RegExp("(^l&)"+name+"=([^&]*)(&|$)","i");
	var queryString=location.search.substr(1)
	var r=queryString.match(reg);
	if(r!=null){return unescape(decodeURI(r[2]));}
	else{return null;}
}