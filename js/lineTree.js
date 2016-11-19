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