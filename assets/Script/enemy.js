cc.Class({
    extends: cc.Component,

    properties: {
        xMinSpeed: {
            default: 0,
            type: cc.Integer,
            tooltip: "x轴最小速度"
        },
        xMaxSpeed: {
            default: 0,
            type: cc.Integer,
            tooltip: "x轴最大速度"
        },
        yMinSpeed: {
            default: 0,
            type: cc.Integer,
            tooltip: "y轴最小速度"
        },
        yMaxSpeed: {
            default: 0,
            type: cc.Integer,
            tooltip: "y轴最大速度"
        },
        initHP: {
            default: 0,
            type: cc.Integer,
            tooltip: "初始生命值"
        },
        initSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
            tooltip: "初始化的图像"
        },
        score: {
            default: 0,
            type: cc.Integer,
            tooltip: "死后获得的分数"
        },
        enemyDownClip: cc.AudioClip
    },

    // use this for initialization
    onLoad: function () {
        cc.log("enemy is onLoad");
        // cc.director.getCollisionManager().enabled = true; //开启碰撞检测
        this.xSpeed = Math.random()*(this.xMaxSpeed - this.xMinSpeed) + this.xMinSpeed;
        this.ySpeed = cc.random0To1()*(this.yMaxSpeed - this.yMinSpeed) + this.yMinSpeed;
        this.enemyGroup = this.node.parent.getComponent("enemyGroup");
    },
    init(){
        if (this.node.group != "enemy") this.node.group = "enemy";
        if (this.hP != this.initHP) this.hP = this.initHP;

        var nSprite = this.node.getComponent(cc.Sprite);
        if (nSprite.spriteFrame != this.initSpriteFrame) nSprite.spriteFrame = this.initSpriteFrame;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y += dt*this.ySpeed;
        //敌机移出屏幕后回收
        if (this.node.y < -this.node.parent.height/2) this.enemyGroup.enemyDied(this.node, 0);
    },

    //动画结束后，动画节点回收
    onFinished(){
        this.enemyGroup.enemyDied(this.node, this.score);
    }
});
