/*
* Created by Quillblue on 2015-7-6
*/
/* Global Config*/
// 第一条时间线距画布左侧的距离
var LEFTMARGIN=200;
// 1分钟格格宽度
var TIMEINTERVAL=6;
// 符号标记单位
var SYMBOLUNIT=6;
// 运行图第一站横线距离画布顶端的距离
var TOPMARGEIN=80;
// 运行图高度
var MAPHEIGHT=850;
// 画布
var svg=d3.select("#map");
// 里程表中最小里程
var MINPOS=0;
// 里程表中最大里程
var MAXPOS=0;
// 运行图分片宽度（默认24小时）
var MAPHOURLENGTH=24;
// 站名词典
var StationDictionary=new Object();

$(document).ready(function(){
	$("#title").html(MapTitle);
	MAPHOURLENGTH=ENDHOUR==STARTHOUR?24:(ENDHOUR+24-STARTHOUR)%24;
	$(".contentHolder").attr("style","width:"+(MAPHOURLENGTH*60*TIMEINTERVAL+300)+"px");
	$("#map").attr("width",MAPHOURLENGTH*60*TIMEINTERVAL+300+"px");
	initStationDictionary();
	drawTimeLine();
	drawStationLine();
	if(DIRECTION_FILTER>=0){
		for(j=0;j<DownTrainData.length;j++){
			drawTrain(DownTrainData[j]);
		}
	}
	if(DIRECTION_FILTER<=0){
		for(j=0;j<UpTrainData.length;j++){
			drawTrain(UpTrainData[j]);
		}
	}
})

//初始化站名词典
function initStationDictionary(){
	MINPOS=StationData[0].position;
	MAXPOS=StationData[StationData.length-1].position;
	for(i=0;i<StationData.length;i++){
		StationDictionary[StationData[i].uniqueName]=StationData[i].position;
	}
	for(i=0;i<SubLineStationData.length;i++){
		var subline=SubLineStationData[i];
		MAXPOS+=30;
		for(j=0;j<subline.length;j++){
			StationDictionary[subline[j].uniqueName]=subline[j].position+MAXPOS;
		}
		MAXPOS=MAXPOS+subline[subline.length-1].position;
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
	for(i=0;i<StationData.length;i++){
		svg.append("line")
			.attr("class","stationLine")
			.style("stroke","#090")
			.attr("x1",0)
			.attr("x2",LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL)
			.attr("y1",convertStationToYCoordinate(StationData[i].uniqueName))
			.attr("y2",convertStationToYCoordinate(StationData[i].uniqueName));
		svg.append("text")
			.attr("class","stationName")
			.text(StationData[i].name)
			.attr("x",3)
			.attr("y",convertStationToYCoordinate(StationData[i].uniqueName)-5);
	}
	for(i=0;i<SubLineStationData.length;i++){
		var subline=SubLineStationData[i];
		for(j=0;j<subline.length;j++){
			svg.append("line")
				.attr("class","stationLine")
				.style("stroke","#090")
				.attr("x1",0)
				.attr("x2",LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL)
				.attr("y1",convertStationToYCoordinate(subline[j].uniqueName))
				.attr("y2",convertStationToYCoordinate(subline[j].uniqueName));
			svg.append("text")
				.attr("class","stationName")
				.text(subline[j].name)
				.attr("x",3)
				.attr("y",convertStationToYCoordinate(subline[j].uniqueName)-5);
		}
	}
}

/* 运行图绘制辅助函数-通用 */
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

//时刻->svg x坐标
function convertTimeToXCoordinate(time){
	var timeFloat=convertTimeToFloat(time);
	timeFloat-=STARTHOUR;
	if(timeFloat<0){timeFloat+=24;}
	return timeFloat*60*TIMEINTERVAL+LEFTMARGIN;
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

/* 列车运行线绘制逻辑与函数 */
//列车运行线绘制逻辑
function drawTrain(train){
	var mapEdgePoint=findLeftAndRightOutPoint(train);
	if(mapEdgePoint.leftIn){drawLeftInMap(train.trainNo,mapEdgePoint.leftInY,train.type);}
	if(mapEdgePoint.rightOut){drawRightOutMap(train.trainNo,mapEdgePoint.rightOutY,train.type)}
	var firstDepatureInMap=train.stops[0].arriveTime==""&&decidePointInMap(train.stops[0].leaveTime,train.stops[0].stationName);
	var terminalArrivedInMap=train.stops[train.stops.length-1].leaveTime==""&&decidePointInMap(train.stops[train.stops.length-1].arriveTime,train.stops[train.stops.length-1].stationName);

	if(firstDepatureInMap){
		drawFirstDepatureSymbol(train.trainNo,train.type,train.stops[0].stationName,train.stops[0].leaveTime,train.direction);
	}
	else{
		if(!mapEdgePoint.leftIn){
			drawInMapSymbol(train.trainNo,train.type,train.stops[0].stationName,train.stops[0].arriveTime,train.direction);
		}
	}

	if(terminalArrivedInMap){
		drawTerminalArrivedSymbol(train.trainNo,train.type,train.stops[train.stops.length-1].stationName,train.stops[train.stops.length-1].arriveTime,train.direction);
	}
	else{
		if(!mapEdgePoint.rightOut){
			drawOutMapSymbol(train.trainNo,train.type,train.stops[train.stops.length-1].stationName,train.stops[train.stops.length-1].leaveTime==""?train.stops[train.stops.length-1].arriveTime:train.stops[train.stops.length-1].leaveTime,train.direction);
		}
	}
	
	if(mapEdgePoint.leftIn&&mapEdgePoint.rightOut){
		if(mapEdgePoint.rightOutStationNo<mapEdgePoint.leftInStationNo||(mapEdgePoint.rightOutStationNo==mapEdgePoint.leftInStationNo&&(!mapEdgePoint.rightOutInStation))){
			drawInMapLine(train,0,mapEdgePoint.rightOutStationNo,false,true,mapEdgePoint);
			drawInMapLine(train,mapEdgePoint.leftInStationNo,train.stops.length,true,false,mapEdgePoint);
		}
		else{
			drawInMapLine(train,mapEdgePoint.leftInStationNo,mapEdgePoint.rightOutStationNo,true,true,mapEdgePoint);
		}
	}
	else{
		if(mapEdgePoint.leftIn){
			drawInMapLine(train,mapEdgePoint.leftInStationNo,train.stops.length,true,false,mapEdgePoint);
		}
		else{
			if(mapEdgePoint.rightOut){
				drawInMapLine(train,0,mapEdgePoint.rightOutStationNo,false,true,mapEdgePoint);
			}
			else{
				drawInMapLine(train,0,train.stops.length,false,false,mapEdgePoint);
			}
		}
	}
	for(i=0;i<train.stops.length;i++){
		if((train.stops[i].arriveTime!=""&&train.stops[i].arriveTime!="...")&&decidePointInMap(train.stops[i].arriveTime,train.stops[i].stationName)){
			var basePoint=convertTimeAndStationToCoordinate(train.stops[i].arriveTime,train.stops[i].stationName);
			var text=train.stops[i].arriveTime.split(":")[1][1];
			svg.append("text")
				.attr("class","timeDigit")
				.text(text)
				.attr("x",basePoint.x+1)
				.attr("y",basePoint.y-train.direction*2)
				.attr("fill",trainLineColor(train.type));
			if(train.stops[i].leaveTime!=""&&decidePointInMap(train.stops[i].leaveTime,train.stops[i].stationName)&&MARK_ARRIVAL_ON_DEPATURE){
				var hourDelta=parseInt(train.stops[i].leaveTime.split(":")[0]-train.stops[i].arriveTime.split(":")[0]);
				if(hourDelta<0){hourDelta+=24;}
				var minuteDelta=parseInt(train.stops[i].leaveTime.split(":")[1]-train.stops[i].arriveTime.split(":")[1])
				var text=hourDelta*60+minuteDelta;
				svg.append("text")
					.attr("class","timeDigitSmall")
					.text(text)
					.attr("x",basePoint.x+3)
					.attr("y",basePoint.y-1.05*train.direction*12)
					.attr("fill","#666");
			}
		}
		if(train.stops[i].leaveTime!=""&&decidePointInMap(train.stops[i].leaveTime,train.stops[i].stationName)){
			var basePoint=convertTimeAndStationToCoordinate(train.stops[i].leaveTime,train.stops[i].stationName);
			var text=train.stops[i].leaveTime.split(":")[1][1];
			svg.append("text")
				.attr("class","timeDigit")
				.text(text)
				.attr("x",basePoint.x-8)
				.attr("y",basePoint.y+train.direction*12)
				.attr("fill",trainLineColor(train.type));
			
		}
	}
}

//判断左右出入图点
function findLeftAndRightOutPoint(train){
	var mapEdgePoint=new Object();
	mapEdgePoint.leftIn=false;
	mapEdgePoint.rightOut=false;
	var previousPointX=convertTimeToXCoordinate(train.stops[0].arriveTime!=""?train.stops[0].arriveTime:train.stops[0].leaveTime);
	var previousPointInMap=decidePointInMapByPointX(previousPointX)
	for(i=0;i<train.stops.length;i++){
		if(train.stops[i].arriveTime!=""&&train.stops[i].arriveTime!="..."){
			var thisPointX=convertTimeToXCoordinate(train.stops[i].arriveTime);
			var thisPointInMap=decidePointInMapByPointX(thisPointX);
			if((!thisPointInMap)&&previousPointInMap||(thisPointX<previousPointX&&previousPointInMap)){
				mapEdgePoint.rightOut=true;
				mapEdgePoint.rightOutStationNo=i;
				mapEdgePoint.rightOutInStation=false;
				mapEdgePoint.rightOutY=calculateEdgePointY(train.stops[i-1].leaveTime==""?train.stops[i-1].arriveTime:train.stops[i-1].leaveTime,train.stops[i].arriveTime,train.stops[i-1].stationName,train.stops[i].stationName,ENDHOUR);
				console.log(train.trainNo+"在"+train.stops[i].stationName+"进站前出图");
			}
			if(thisPointInMap&&!(previousPointInMap)||(thisPointX<previousPointX&&previousPointInMap)){
				mapEdgePoint.leftIn=true;
				mapEdgePoint.leftInStationNo=i;
				mapEdgePoint.leftInInStation=false;
				mapEdgePoint.leftInY=calculateEdgePointY(train.stops[i-1].leaveTime==""?train.stops[i-1].arriveTime:train.stops[i-1].leaveTime,train.stops[i].arriveTime,train.stops[i-1].stationName,train.stops[i].stationName,STARTHOUR);
				console.log(train.trainNo+"在"+train.stops[i].stationName+"进站前进图");
			}
			previousPointX=thisPointX;
			previousPointInMap=thisPointInMap;
		}
		if(train.stops[i].leaveTime!=""){
			var thisPointX=convertTimeToXCoordinate(train.stops[i].leaveTime);
			var thisPointInMap=decidePointInMapByPointX(thisPointX);
			if((!thisPointInMap)&&previousPointInMap||(thisPointX<previousPointX&&previousPointInMap)){
				mapEdgePoint.rightOut=true;
				mapEdgePoint.rightOutStationNo=i;
				mapEdgePoint.rightOutInStation=true;
				mapEdgePoint.rightOutY=convertStationToYCoordinate(train.stops[i].stationName);
				console.log(train.trainNo+"在"+train.stops[i].stationName+"出站前出图");
			}
			if(thisPointInMap&&!(previousPointInMap)||(thisPointX<previousPointX&&previousPointInMap)){
				mapEdgePoint.leftIn=true;
				mapEdgePoint.leftInStationNo=i;
				mapEdgePoint.leftInInStation=true;
				mapEdgePoint.leftInY=convertStationToYCoordinate(train.stops[i].stationName);
				console.log(train.trainNo+"在"+train.stops[i].stationName+"出站前进图");
			}
			previousPointX=thisPointX;
			previousPointInMap=thisPointInMap;
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

//列车类型->运行图颜色
function trainLineColor(type){
	switch(type){
		case "G":
		case "D":
		case "C":
		case "Z":
		case "T":
		case "K":
		case "L":
		case "客":return "#f00";
		case "X":
		case "货":return "#000";
		case "DJ":
		case "0":
		case "路用": return "#0f0";
		default:return "";
	}
}

//绘制始发标记
function drawFirstDepatureSymbol(trainNo,type,stationName,time,direction){
	var extendLength=calculateSymbolConnectionLength(stationName,direction,time);
	var basePoint=convertTimeAndStationToCoordinate(time,stationName);
	var halfLength=(trainNo.length/2+1.25)*SYMBOLUNIT
	var polylinePoints=basePoint.x+","+basePoint.y;
	polylinePoints+=" "+basePoint.x+","+(basePoint.y-direction*1.75*SYMBOLUNIT-direction*extendLength);
	polylinePoints+=" "+(basePoint.x-halfLength)+","+(basePoint.y-direction*1.75*SYMBOLUNIT-direction*extendLength);
	polylinePoints+=" "+(basePoint.x+halfLength)+","+(basePoint.y-direction*1.75*SYMBOLUNIT-direction*extendLength);
	svg.append("polyline")
			.attr("class","drawFirstDepatureSymbol trainLine_"+trainNo)
			.attr("points",polylinePoints)
			.attr("stroke",trainLineColor(type))
			.attr("stroke-width","1.5")
			.attr("fill","transparent");
	svg.append("text")
			.attr("class","firstDepatureTrainNo")
			.text(trainNo)
			.attr("x",(basePoint.x-trainNo.length/2*8))
			.attr("y",(basePoint.y-direction*1.75*SYMBOLUNIT-direction*(extendLength+3)))
			.attr("fill",trainLineColor(type));
}	

//绘制终到标记
function drawTerminalArrivedSymbol(trainNo,type,stationName,time,direction){
	var extendLength=calculateSymbolConnectionLength(stationName,direction,time);
	var basePoint=convertTimeAndStationToCoordinate(time,stationName);
	var polylinePoints=basePoint.x+","+basePoint.y;
	polylinePoints+=" "+basePoint.x+","+(basePoint.y+direction*2*SYMBOLUNIT+direction*extendLength);
	polylinePoints+=" "+(basePoint.x-SYMBOLUNIT)+","+(basePoint.y+direction*2*SYMBOLUNIT+direction*extendLength);
	polylinePoints+=" "+basePoint.x+","+(basePoint.y+direction*4*SYMBOLUNIT+direction*extendLength);
	polylinePoints+=" "+(basePoint.x+SYMBOLUNIT)+","+(basePoint.y+direction*2*SYMBOLUNIT+direction*extendLength);
	polylinePoints+=" "+basePoint.x+","+(basePoint.y+direction*2*SYMBOLUNIT+direction*extendLength);
	svg.append("polyline")
			.attr("class","terminalArrivalSymbol trainLine_"+trainNo)
			.attr("points",polylinePoints)
			.attr("stroke",trainLineColor(type))
			.attr("stroke-width","1.5")
			.attr("fill","transparent");
	//TODO 终到标记反馈
}

//绘制出图标记
function drawOutMapSymbol(trainNo,type,stationName,time,direction){
	var extendLength=calculateSymbolConnectionLength(stationName,direction,time);
	var basePoint=convertTimeAndStationToCoordinate(time,stationName);
	var polylinePoints=basePoint.x+","+basePoint.y;
	polylinePoints+=" "+basePoint.x+","+(basePoint.y+direction*2*SYMBOLUNIT+direction*extendLength);
	polylinePoints+=" "+(basePoint.x+2*SYMBOLUNIT)+","+(basePoint.y+direction*2*SYMBOLUNIT+direction*extendLength);
	polylinePoints+=" "+(basePoint.x+1.25*SYMBOLUNIT)+","+(basePoint.y+direction*1.25*SYMBOLUNIT+direction*extendLength);
	polylinePoints+=" "+(basePoint.x+2*SYMBOLUNIT)+","+(basePoint.y+direction*2*SYMBOLUNIT+direction*extendLength);
	polylinePoints+=" "+(basePoint.x+1.25*SYMBOLUNIT)+","+(basePoint.y+direction*2.75*SYMBOLUNIT+direction*extendLength);
	svg.append("polyline")
			.attr("class","drawOutMapSymbol trainLine_"+trainNo)
			.attr("points",polylinePoints)
			.attr("stroke",trainLineColor(type))
			.attr("stroke-width","1.5")
			.attr("fill","transparent");
	//TO-DO 出图标记反馈
}

//绘制入图标记
function drawInMapSymbol(trainNo,type,stationName,time,direction){
	var extendLength=calculateSymbolConnectionLength(stationName,direction,time);
	var basePoint=convertTimeAndStationToCoordinate(time,stationName);
	var lineLength=(trainNo.length+2.5)*SYMBOLUNIT
	var polylinePoints=basePoint.x+","+basePoint.y;
	polylinePoints+=" "+basePoint.x+","+(basePoint.y-direction*1.75*SYMBOLUNIT-direction*extendLength);
	polylinePoints+=" "+(basePoint.x-lineLength)+","+(basePoint.y-direction*1.75*SYMBOLUNIT-direction*extendLength);
	svg.append("polyline")
			.attr("class","drawInMapSymbol trainLine_"+trainNo)
			.attr("points",polylinePoints)
			.attr("stroke",trainLineColor(type))
			.attr("stroke-width","1.5")
			.attr("fill","transparent");
	svg.append("text")
			.attr("class","InMapTrainNo")
			.text(trainNo)
			.attr("x",(basePoint.x-trainNo.length*6-1.75*SYMBOLUNIT))
			.attr("y",(basePoint.y-direction*1.75*SYMBOLUNIT-direction*(extendLength+3)))
			.attr("fill",trainLineColor(type));
}

//绘制右侧出图线
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

//绘制左侧入图线
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

//图内折线绘制
function drawInMapLine(train,stopNumberStart,stopNumberEnd,isLeftIn,isRightOut,mapEdgePoint){
	var trainLine="";
	if(isLeftIn){
		trainLine+=LEFTMARGIN+","+mapEdgePoint.leftInY;
	}
	for(i=stopNumberStart;i<stopNumberEnd;i++){
		if((train.stops[i].arriveTime!=""&&train.stops[i].arriveTime!="...")&&decidePointInMap(train.stops[i].arriveTime,train.stops[i].stationName)){
			var point=convertTimeAndStationToCoordinate(train.stops[i].arriveTime,train.stops[i].stationName);
			trainLine+=" "+point.x+","+point.y;
		}
		if(train.stops[i].leaveTime!=""&&decidePointInMap(train.stops[i].leaveTime,train.stops[i].stationName)){
			var point=convertTimeAndStationToCoordinate(train.stops[i].leaveTime,train.stops[i].stationName);
			trainLine+=" "+point.x+","+point.y;
		}
		if(SubLineConnectionStation.hasOwnProperty(train.stops[i].stationName)){
			if(i<stopNumberEnd-1&&train.stops[i+1].stationName!=SubLineConnectionStation[train.stops[i].stationName]){
				var point=convertTimeAndStationToCoordinate(train.stops[i].leaveTime,train.stops[i].stationName+"("+train.stops[i+1].stationName+"方向)");
				trainLine+=" "+point.x+","+point.y;
			}
		}
	}
	if(isRightOut){
		trainLine+=" "+(LEFTMARGIN+MAPHOURLENGTH*60*TIMEINTERVAL)+","+mapEdgePoint.rightOutY;
	}
	svg.append("polyline")
			.attr("class","terminalArrivalSymbol trainLine_"+train.trainNo)
			.attr("points",trainLine)
			.attr("stroke",trainLineColor(train.type))
			.attr("stroke-width","1.5")
			.attr("fill","transparent");
}
