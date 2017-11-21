//敌机组
var enemyG = cc.Class({
    name: "enemyG",
    properties: {
        name: "",
        freqTime: 0,
        initPollCount: 0,
        prefab: cc.Prefab
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        enemyG: {
            default: [],
            type: enemyG,
            tooltip: "敌机组"
        },
    },

    // use this for initialization
    onLoad: function () {
        this.eState = D.commonInfo.gameState.none;
        //初始化敌机组
        D.common.batchInitObjPool(this, this.enemyG);
        cc.log("enemyGroup is onLoad", this.enemyG);
    },

    startAction(){
        this.eState = D.commonInfo.gameState.start;
        //定时生成敌机
        for (var ei = 0; ei < this.enemyG.length; ei++) {
             var freqTime = this.enemyG[ei].freqTime;
             var fName = "callback_" + ei;
             this[fName] = function(e) {
                 this._getNewEnemy(this.enemyG[e]);
             }.bind(this, ei);
             cc.log("定时生成敌机", this.enemyG[ei]);
             this.schedule(this[fName], freqTime);
        }
    },
    //生成敌机
    _getNewEnemy(enemyInfo){
        if (!enemyInfo) {
            cc.log("敌机为null", enemyInfo);
            return;
        }
        var poolName = enemyInfo.name + "pool";
        var newNode = D.common.getNewNode(this[poolName], enemyInfo.prefab, this.node);
        var newV2 = this._getNewEnemyPosition(newNode);
        newNode.setPosition(newV2);
        newNode.getComponent("enemy").init();
    },
    //敌机随机生成的位置
    _getNewEnemyPosition(newEnemy){
        //位于上方，先不可见
        var randX = cc.randomMinus1To1()*(this.node.parent.width/2 - newEnemy.width/2);
        var randy = this.node.parent.height/2 + newEnemy.height/2;
        return cc.v2(randX, randy);
    },
    //重新开始
    resumeAction(){
        this.enabled = true;
        this.eState = D.commonInfo.gameState.start;
    },
    //暂停
    pauseAction(){
        this.enabled = false;
        this.eState = D.commonInfo.gameState.pause;
    },
    enemyDied(nodeInfo, score){
        //回收节点
        D.common.backObjPool(this, nodeInfo);
        //增加分数
        if (parseInt(score) > 0) D.main.gainScore(score);
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
