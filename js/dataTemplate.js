/*
* Create By Quillblue on 2015-7-8
* Data Config File
*/

//京沪线徐蚌段里程表
var LINEDATA_JINGHU_XUBENG={
	StationData:[{name:"徐州",uniqueName:"徐州",position:0},
		{name:"高家营",uniqueName:"高家营",position:8},
		{name:"三铺",uniqueName:"三铺",position:15},
		{name:"曹村",uniqueName:"曹村",position:30},
		{name:"夹沟*",uniqueName:"夹沟*",position:44},
		{name:"符离集",uniqueName:"符离集",position:60},
		{name:"宿州",uniqueName:"宿州",position:74},
		{name:"宿州南",uniqueName:"宿州南",position:78},
		{name:"西寺坡",uniqueName:"西寺坡",position:91},
		{name:"芦岭",uniqueName:"芦岭",position:99},
		{name:"唐南集",uniqueName:"唐南集",position:115},
		{name:"固镇",uniqueName:"固镇",position:121},
		{name:"连城",uniqueName:"连城",position:129},
		{name:"新马桥",uniqueName:"新马桥",position:136},
		{name:"曹老集",uniqueName:"曹老集",position:151},
		{name:"蚌埠",uniqueName:"蚌埠",position:164}],

SubLineConnectionStation:{"高家营":"徐州","曹老集":"蚌埠"},
SubLineStationData:[{remark:"徐州货线",direction:-1,stations:[{name:"高家营",uniqueName:"高家营(徐州南方向)",position:0},
		{name:"徐州南",uniqueName:"徐州南",position:8},
		{name:"徐州北上到下发",uniqueName:"徐州北上到下发",position:11},
		{name:"徐州北下到上发",uniqueName:"徐州北下到上发",position:13}]},
{remark:"曹山线",direction:1,stations:[{name:"曹老集",uniqueName:"曹老集(曹山方向)",position:0},
		{name:"曹山",uniqueName:"曹山",position:14},
		{name:"蚌埠东",uniqueName:"蚌埠东",position:22}]}]}
