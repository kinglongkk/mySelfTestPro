var gameState = cc.Enum({
    none: 0,
    start: 1,
    stop: 2,
});
var common = cc.Class({
    extends: cc.Component,
    properties: {},
    statics: {
        gameState
    },
    onLoad: function () {
        D.commonInfo = common;
        D.common = this;
    },
    //批量初始化对象池
    batchInitObjPool(thisO, objArray){
        for (var i = 0; i < objArray.length; i++) {
            var objInfo = objArray[i];
            this.initObjPool(thisO, objInfo);
        }
    },
    //初始化对象池
    initObjPool(thisO, objInfo){
        var name = objInfo.name;
        var poolName = name + "pool";
        thisO[poolName] = new cc.NodePool();
        let initPollCount = objInfo.initPollCount;
        for (let ii = 0; ii < initPollCount; ii++) {
            let nodeO = cc.instantiate(objInfo.prefab);//创建节点
            thisO[poolName].put(nodeO);//通过putInPool接口放入对象池
        }
    },
    //生成节点
    genNewNode(pool, prefab, nodeParent){
        let newNode = null;
        if (pool.size() > 0) {//通过size接口判断对象池中是否有空闲对象
            newNode = pool.get();
        } else {//如果没有空闲对象，也就是对象池中备用对象不够时，我们就用cc.instantiate重新创建
            newNode = cc.instantiate(prefab);
        }
        nodeParent.addChild(newNode);
        return newNode;
    },
    //放回对象池
    backObjPool(thisO, nodeInfo){
        var poolName = nodeInfo.name + "pool";
        thisO[poolName].put(nodeInfo);
    },
    //时间格式化
});