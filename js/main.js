/*
* Created by Quillblue on 2015-7-6
*/

var LEFTMARGIN=200;
var TIMEINTERVAL=6;
var TOPMARGEIN=80;
var MAPHEIGHT=800;
var svg=d3.select("#map");
var MINPOS=0;
var MAXPOS=0;
var MAPHOURLENGTH=24;
var StationDictionary=new Object();

$(document).ready(function(){
	$("#title").html(MapTitle);
	MAPHOURLENGTH=ENDHOUR==STARTHOUR?24:(ENDHOUR+24-STARTHOUR)%24;
	$(".contentHolder").attr("style","width:"+(MAPHOURLENGTH*60*TIMEINTERVAL+300)+"px");
	$("#map").attr("width",MAPHOURLENGTH*60*TIMEINTERVAL+300+"px");
	initStationDictionary();
	drawTimeLine();
	drawStationLine();
	for(i=0;i<TrainData.length;i++){
		drawTrain(TrainData[i]);
	}
})

function initStationDictionary(){
	MINPOS=StationData[0].position;
	MAXPOS=StationData[StationData.length-1].position;
	for(i=0;i<StationData.length;i++){
		StationDictionary[StationData[i].name]=StationData[i].position;
	}
}

/* 运行图底图绘制函数 */
//时间线绘制逻辑
function drawTimeLine(){
	for(i=0;i<=6*MAPHOURLENGTH;i++){
		var type="10min"
		if(i%6==0){type="hour"}
		else{
			if(i%3==0){type="30min"}
		}
		drawTimeLineImpl(i,type)
	}
}

//时间线绘制实现
function drawTimeLineImpl(timeOrder,type){
	svg.append("line")
		.attr("class","timeLine")
		.style("stroke","#090")
		.style("stroke-width",type=="hour"?"2px":"1px")
		.attr("x1",LEFTMARGIN+TIMEINTERVAL*timeOrder*10)
		.attr("x2",LEFTMARGIN+TIMEINTERVAL*timeOrder*10)
		.attr("y1",type=="hour"?20:TOPMARGEIN)
		.attr("y2",TOPMARGEIN+MAPHEIGHT)
	if(type=="hour"){
		var hourNo=(i/6+STARTHOUR)%24;
		svg.append("text")
			.attr("class","time")
			.text((hourNo<10)?("0"+hourNo+":00"):(hourNo+":00"))
			.style("fill","#666")
			.attr("x",LEFTMARGIN+TIMEINTERVAL*timeOrder*10-16)
			.attr("y",15);
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

//站名与里程线绘制
function drawStationLine(){
	var maxPos=StationData[StationData.length-1].position-StationData[0].position;
	for(i=0;i<StationData.length;i++){
		svg.append("line")
			.attr("class","stationLine")
			.style("stroke","#090")
			.attr("x1",0)
			.attr("x2",LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL)
			.attr("y1",convertStationToYCoordinate(StationData[i].name))
			.attr("y2",convertStationToYCoordinate(StationData[i].name));
		svg.append("text")
			.attr("class","stationName")
			.text(StationData[i].name)
			.attr("x",3)
			.attr("y",convertStationToYCoordinate(StationData[i].name)-5);
		svg.append("text")
			.attr("class","stationPos")
			.text(StationData[i].position)
			.attr("fill","#00f")
			.attr("x",LEFTMARGIN-StationData[i].position.toString().length*6-80)
			.attr("y",convertStationToYCoordinate(StationData[i].name)-5)
	}
}


//列车运行线绘制逻辑
function drawTrain(train){
	var mapEdgePoint=findLeftAndRightOutPoint(train);
	if(mapEdgePoint.leftIn){drawLeftInMap(train.trainNo,mapEdgePoint.leftInY,train.type);}
	if(mapEdgePoint.rightOut){drawRightOutMap(train.trainNo,mapEdgePoint.rightOutY,train.type)}
	var firstDepatureInMap=StationDictionary.hasOwnProperty(train.depature)&&decidePointInMap(train.stops[0].leaveTime,train.stops[0].stationName);
	var terminalArrivedInMap=StationDictionary.hasOwnProperty(train.arrival)&&decidePointInMap(train.stops[train.stops.length-1].arriveTime,train.stops[train.stops.length-1].stationName);

	if(firstDepatureInMap){
		//TODO drawFirstDepatureSign	
	}
	else{
		//TODO draw InMapSign
	}

	if(terminalArrivedInMap){
		drawTerminalArrivedSymbol(convertTimeAndStationToCoordinate("19:36",train.arrival),train.type,train.direction);
	}
	else{
		//TODO draw OutMapSign
	}

}


/* 运行图底图绘制辅助函数 */
//(时刻,站名)->svg坐标
function convertTimeAndStationToCoordinate(time,stationName){
	var basePoint=new Object();
	var hour=parseInt(time.split(":")[0]);
	var minute=parseFloat(time.split(":")[1]);
	basePoint.x=((hour+(24-STARTHOUR))%24*60+minute)*TIMEINTERVAL+LEFTMARGIN;
	basePoint.y=convertStationToYCoordinate(stationName);
	return basePoint;
}

//时刻->数字
function convertTimeToFloat(time){
	var hour=parseFloat(time.split(":")[0]);
	var minute=parseFloat(time.split(":")[1]);
	return hour+minute/60;
}

//站名->svg y坐标
function convertStationToYCoordinate(stationName){
	return (StationDictionary[stationName]-MINPOS)/(MAXPOS-MINPOS)*MAPHEIGHT+TOPMARGEIN;
}

//判断坐标点是否在图内
function decidePointInMap(time,stationName){
	var point=convertTimeAndStationToCoordinate(time,stationName);
	return (point.x>=LEFTMARGIN&&point.x<=LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL)&&(point.y>=TOPMARGEIN&&point.y<=TOPMARGEIN+MAPHEIGHT);
}

//判断左右出入图点
function findLeftAndRightOutPoint(train){
	var mapEdgePoint=new Object();
	mapEdgePoint.leftIn=false;
	mapEdgePoint.rightOut=false;
	var previousPointInMap=decidePointInMap(train.stops[0].arriveTime!=""?train.stops[0].arriveTime:train.stops[0].leaveTime,train.stops[0].stationName);
	for(i=0;i<train.stops.length;i++){
		if(train.stops[i].arriveTime!=""){
			var thisPointInMapInMap=decidePointInMap(train.stops[i].arriveTime,train.stops[i].stationName);
			if((!thisPointInMapInMap)&&previousPointInMap){
				mapEdgePoint.rightOut=true;
				mapEdgePoint.rightOutStationNo=i;
				mapEdgePoint.rightOutInStation=false;
				mapEdgePoint.rightOutY=calculateEdgePointY(train.stops[i-1].leaveTime==""?train.stops[i-1].arriveTime:train.stops[i-1].leaveTime,train.stops[i].arriveTime,train.stops[i-1],train.stops[i],ENDHOUR);
				console.log(train.trainNo+"在"+train.stops[i].stationName+"进站前出图");
			}
			if(thisPointInMapInMap&&!(previousPointInMap)){
				mapEdgePoint.leftIn=true;
				mapEdgePoint.leftInStationNo=i;
				mapEdgePoint.leftInInStation=true;
				mapEdgePoint.leftInY=convertStationToYCoordinate(train.stops[i].stationName);
				console.log(train.trainNo+"在"+train.stops[i].stationName+"出站前进图");
			}
			previousPointInMap=thisPointInMapInMap;
		}
		if(train.stops[i].leaveTime!=""){
			var thisPointInMapInMap=decidePointInMap(train.stops[i].leaveTime,train.stops[i].stationName);
			if((!thisPointInMapInMap)&&previousPointInMap){
				mapEdgePoint.rightOut=true;
				mapEdgePoint.rightOutStationNo=i;
				mapEdgePoint.rightOutInStation=true;
				mapEdgePoint.rightOutY=convertStationToYCoordinate(train.stops[i].stationName);
				console.log(train.trainNo+"在"+train.stops[i].stationName+"出站前出图");
			}
			if(thisPointInMapInMap&&!(previousPointInMap)){
				mapEdgePoint.leftIn=true;
				mapEdgePoint.leftInStationNo=i;
				mapEdgePoint.leftInInStation=false;

				mapEdgePoint.rightOutY=calculateEdgePointY(train.stops[i-1].leaveTime==""?train.stops[i-1].arriveTime:train.stops[i-1].leaveTime,train.stops[i].arriveTime,train.stops[i-1],train.stops[i],STARTHOUR);
				console.log(train.trainNo+"在"+train.stops[i].stationName+"进站前进图");
			}
			previousPointInMap=thisPointInMapInMap;
		}
	}
	return mapEdgePoint;
}

//智能判断标线延长程度
//TODO implement it
function calculateSymbolConnectionLength(stationName,direction,symbolTime){
	return 0;
}

//计算出入图点位置
function calculateEdgePointY(timePrev,timeAfter,stationPrev,stationAfter,timeCurrent){
	var pointYprev=convertStationToYCoordinate(stationPrev);
	var pointYafter=convertStationToYCoordinate(stationAfter);
	var during=convertTimeToFloat(timeAfter)-convertTimeToFloat(timePrev);
	if(during<0){during+=24;}
	var duringPast=timeCurrent-convertTimeToFloat(timePrev);
	if(duringPast<0){duringPast+=24;}
	return pointYprev+duringPast/during*(pointYafter-pointYprev);
}

/* 列车运行线绘制函数 */
//列车类型->运行图颜色
function trainLineColor(type){
	switch(type){
		case "G":
		case "D":
		case "C":
		case "Z":
		case "T":
		case "K":
		case "L":return "#f00";
		case "X":
		case "货":return "#000";
		case "DJ":
		case "0":
		case "路用": return "#0f0";
		default:return "";
	}
}

//绘制始发标记
function drawFristDepatureSymbol(trainNo,basePoint,type,direction){

}

//绘制终到标记（待更新）
function drawTerminalArrivedSymbol(basePoint,type,direction){
	var polylinePoints=basePoint.x+","+basePoint.y;
	polylinePoints+=" "+basePoint.x+","+(basePoint.y+direction*2*TIMEINTERVAL);
	polylinePoints+=" "+(basePoint.x-TIMEINTERVAL)+","+(basePoint.y+direction*2*TIMEINTERVAL);
	polylinePoints+=" "+basePoint.x+","+(basePoint.y+direction*4*TIMEINTERVAL);
	polylinePoints+=" "+(basePoint.x+TIMEINTERVAL)+","+(basePoint.y+direction*2*TIMEINTERVAL);
	polylinePoints+=" "+basePoint.x+","+(basePoint.y+direction*2*TIMEINTERVAL);
	svg.append("polyline")
			.attr("class","terminalArrivalSymbol")
			.attr("points",polylinePoints)
			.attr("stroke",trainLineColor(type))
			.attr("stroke-width","1.5")
			.attr("fill","transparent");
}

//绘制出图标记
function drawOutMapSymbol(basePoint,type,direction){

}

//绘制入图标记
function drawInMapSymbol(trainNo,basePoint,type,direction){

}

//绘制分钟数字
function drawTimeDigit(type,basePoint,direction,isArrival){

}

function drawRightOutMap(trainNo,outPointY,type){
	svg.append("line")
			.attr("class","rightOutMapLine MapLine"+trainNo)
			.style("stroke",trainLineColor(type))
			.attr("x1",LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL)
			.attr("x2",LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL+60-(6-trainNo.length)*6)
			.attr("y1",outPointY)
			.attr("y2",outPointY);
	svg.append("text")
			.attr("class","outMapTrainNo")
			.text(trainNo)
			.attr("x",LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL+10)
			.attr("y",outPointY-3)
			.attr("fill",trainLineColor(type));
}

function drawLeftInMap(trainNo,inPointY,type){
	svg.append("line")
			.attr("class","leftInMapLine MapLine"+trainNo)
			.style("stroke",trainLineColor(type))
			.attr("x1",LEFTMARGIN-60+(6-trainNo.length)*6)
			.attr("x2",LEFTMARGIN)
			.attr("y1",inPointY)
			.attr("y2",inPointY);
	svg.append("text")
			.attr("class","outMapTrainNo")
			.text(trainNo)
			.attr("x",LEFTMARGIN-50+(6-trainNo.length)*6)
			.attr("y",inPointY-3)
			.attr("fill",trainLineColor(type));
}

function drawInMapLine(train,mapEdgePoint){
	if(mapEdgePoint.rightOut&&mapEdgePoint.leftIn){

	}
	else{

	}
}

