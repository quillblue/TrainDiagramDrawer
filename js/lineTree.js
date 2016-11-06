var lineTree = {
    treeObj : null,
    init : function() {
        lineTree.treeObj = $.fn.zTree.init($("#lineTree"), treeSetting,nodes);
    },
    nodeChange : function(treeNode) {
        lineTree.nodeSelected = treeNode;
        $("#nodeSelected").trigger('change');
    }
};

var treeSetting={
        view : {
            selectMulti : false,
        },
        edit : {
            enable : true
        },
        callback : {
            beforeDrag : function(treeId, treeNodes) {
                return false;
            },
            beforeExpand : function(treeId, treeNode) {
                var nodes = lineTree.treeObj.getNodesByParam("level",
                    treeNode.level);
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].open = true && nodes[i] != treeNode) {
                        lineTree.treeObj.expandNode(nodes[i], false);
                    }
                }
            },
            onExpand : function(event, treeId, treeNode) {
            },
            onClick:function(event, treeId, treeNode) {
                if (treeNode.isParent) {
                    var zTree = $.fn.zTree.getZTreeObj("tree");
                    zTree.expandNode(treeNode, null, null, null, true);
                    lineTree.selectedNode = treeNode;
                }else{
                    alert('1')
                }
            }
        }
}

var nodes=[
    {name:'京沪线',children:[
        {name:'利国-徐州(北)(20150701)',dataFileName:'#'},
        {name:'徐州(北)-蚌埠(东)(20150701)',dataFileName:'#'},
        {name:'蚌埠(东)-南京(西)(20150701)',dataFileName:'#'},
        {name:'南京(西)-常州(东)(20150701)',dataFileName:'#'},
        {name:'常州(东)-上海(南)(20150701)',dataFileName:'#'}
    ]},
    {name:'京沪高速线',children:[
        {name:'徐州(东)-上海(虹桥)',dataFileName:'#'}
    ]},
    {name:'沪宁城际线',children:[
        {name:'南京(南)-上海(虹桥)(20150701)',dataFileName:'#'}
    ]},
    {name:'沪昆线',children:[
        {name:'上海(南)/南翔-杭州(东)(20150701)',dataFileName:'#'},
        {name:'杭州(东)-新塘边(20150701)',dataFileName:'#'}    
    ]},
    {name:'沪昆高速线',children:[
        {name:'上海(虹桥)-杭州(东)(20150701)',dataFileName:'#'},
        {name:'杭州东-江山(20150701)',dataFileName:'#'},
        {name:'江山-醴陵东(20160110)',dataFileName:'#'}        
    ]},
    {name:'杭深线',children:[
        {name:'杭州东-宁波(20150701)',dataFileName:'#'},
        {name:'宁波-苍南(20150701)',dataFileName:'#'}    
    ]},
    {name:'上海枢纽',children:[
        {name:'南翔-北郊-杨行/何家湾-杨浦(20150701)',dataFileName:'#'},
        {name:'上海南-新桥-金山卫/芦潮港工作日图(20160110)',dataFileName:'#'}    
    ]},
    {name:'上海地铁',children:[
        {name:'1号线',dataFileName:'#'},
        {name:'11号线',dataFileName:'#'}    
    ]}
]