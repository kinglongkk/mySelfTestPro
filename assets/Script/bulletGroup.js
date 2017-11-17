//子弹生成位置
var bPosition = cc.Class({
    name: "bPosition",
    properties: {
        xAxis: {
            default: "",
            tooltip: "初始x轴，相对hero"
        },
        yAxis: {
            default: "",
            tooltip: "初始化y轴，相对hero"
        }
    }
});
//不限时长子弹
var bulletInfinite = cc.Class({
    name: "bulletInfinite",
    properties: {
        name: "",
        freqTime: 0,
        initPollCount: 0,
        prefab: cc.Prefab,
        position: {
            default: [],
            type: bPosition,
            tooltip: "每次多少排子弹",
        }
    }
});
//不限时长子弹组
var bulletFiniteG = cc.Class({
    name: "bulletFiniteG",
    extends: bulletInfinite,
    properties: {
        finiteTime: 0,
        orginName: ""
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        bulletInfinite: {
            default: null,
            type: bulletInfinite,
            tooltip: "无限时长子弹组"
        },
        bulletFiniteG: {
            default: [],
            type: bulletFiniteG,
            tooltip: "有限时长子弹组"
        },
        hero: {
            default: null,
            type: cc.Node,
            displayName: ""
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.log("bulletGroup is onLoad");
        this.eState = D.commonInfo.gameState.none;
        //初始化无限子弹组
        D.common.initObjPool(this, this.bulletInfinite);
        //初始化有限子弹组
        D.common.batchInitObjPool(this, this.bulletFiniteG);
    },
    startAction(){
        this.eState = D.commonInfo.gameState.start;
        //生成子弹
        this._getNewBullet(this.bulletInfinite);
        this.bICallback = function () {this._getNewBullet(this.bulletInfinite);}.bind(this);
        this.schedule(this.bICallback, this.bulletInfinite.freqTime);
    },
    //暂停
    pauseAction(){
        this.enabled = false;
        this.eState = D.commonInfo.gameState.pause;
    },
    //重新开始
    resumeAction(){
        this.enabled = true;
        this.eState = D.commonInfo.gameState.start;
    },
    //换子弹
    changeBullet(){
        this.unschedule(this.bICallback);
        this.unschedule(this.bFCallback);
        for (var bi = 0; bi < this.bulletFiniteG.length; bi++) {
            if (this.bulletFiniteG[bi].orginName == ufoBulletName) {
                this.bFCallback = function (e) {
                    
                }
            }
        }
    },
    //生成子弹
    _getNewBullet(bulletInfo){
        var poolName = bulletInfo.name + "pool";
        for (var bc = 0; bc < bulletInfo.position.length; bc ++) {
            var newNode = D.common.getNewNode(this[poolName], bulletInfo.prefab, this.node);
            var newV2 = this.getBulletPosition(bulletInfo.position[bc]);
            newNode.setPosition(newV2);
            newNode.getComponent("bullet").bulletGroup = this;
        }
    },
    //获取子弹位置
    getBulletPosition(posInfo){
        var hPos = this.hero.getPosition();
        var newV2_x = hPos.x + eval(posInfo.xAxis);
        var newV2_y = hPos.y + eval(posInfo.yAxis);
        return cc.p(newV2_x, newV2_y);
    },
    //子弹灭亡
    bulletDied(nodeInfo){
        //回收节点
        D.common.backObjPool(this, nodeInfo);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
