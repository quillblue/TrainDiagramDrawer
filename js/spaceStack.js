/*
* Create By Quillblue on 2015-7-18
* 空间占用情况指示
*/

var SpaceIndicator={
	SpaceStack:new Object(),
	MAXLEVEL:3,

	init:function(stationList){
		for(i=0;i<stationList.length;i++){
			this.SpaceStack[stationList[i].uniqueName]=[];
			for(j=0;j<2*this.MAXLEVEL;j++){this.SpaceStack[stationList[i].uniqueName].push([]);}
		}
	},

	isOverlap:function(stationName,direction,pointSpan,level){
		if(this.SpaceStack.hasOwnProperty(stationName)){
			var queryIndex=this.convertDirectionAndLevelToIndex(direction,level);
			var queryRange=this.SpaceStack[stationName][queryIndex];
			for(i=0;i<queryRange.length;i++){
				var blockedSpace=queryRange[i];
				if((pointSpan[0]>=blockedSpace[0]&&pointSpan[0]<=blockedSpace[1])||((pointSpan[1]>=blockedSpace[0]&&pointSpan[1]<=blockedSpace[1]))){
					return true;
				}
			}
			return false;
		}
		else{
			return false;
		}
	},

	push:function(stationName,direction,level,pointSpan){
		var queryIndex=this.convertDirectionAndLevelToIndex(direction,level);
		this.SpaceStack[stationName][queryIndex].push(pointSpan);
	},

	convertDirectionAndLevelToIndex:function(direction,level){
		return (direction+1)*1.5+level;
	}
}