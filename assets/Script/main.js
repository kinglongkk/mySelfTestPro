cc.Class({
    extends: cc.Component,

    properties: {
        pause: cc.Button,
        btnSprite: {
            default: [],
            type: cc.SpriteFrame,
            tooltip: "暂停按钮不同状态的图片"
        },

        enemyGroup: {
            default: null,
            type: require("enemyGroup")
        },
        hero: {
            default: null,
            type: require("hero")
        },
        bulletGroup: {
            default: null,
            type: require("bulletGroup")
        },
        scoreDisplay: {
            default: null,
            type: cc.Label,
            tooltip: "积分显示"
        }
    },

    // use this for initialization
    onLoad: function () {
        D.main = this;

        this.score = 0;
        this.scoreDisplay.string = this.score;
        this.eState = D.commonInfo.gameState.start;
        this.enemyGroup.startAction();
        this.bulletGroup.startAction();
    },



    //暂停按钮点击时间
    pauseClick(){
        if (this.eState == D.commonInfo.gameState.pause) {
            this.resumeAction();
            this.eState = D.commonInfo.gameState.start;
        } else {
            this.pauseAction();
            this.eState = D.commonInfo.gameState.pause;
        }
    },
    //游戏继续
    resumeAction(){
        this.enemyGroup.resumeAction();
        this.bulletGroup.resumeAction();
        this.hero.onDrag();

        this.pause.normalSprite = this.btnSprite[0];
        this.pause.pressedSprite = this.btnSprite[1];
        this.pause.hoverSprite = this.btnSprite[1];
    },
    //游戏暂停
    pauseAction(){
        this.enemyGroup.pauseAction();
        this.bulletGroup.pauseAction();
        this.hero.offDrag();

        this.pause.normalSprite = this.btnSprite[2];
        this.pause.pressedSprite = this.btnSprite[3];
        this.pause.hoverSprite = this.btnSprite[3];
    },
    //增加分数
    gainScore(scoreNo){
        this.score += scoreNo;
        //更新积分显示
        this.scoreDisplay.string = this.score.toString();
    },
    //get分数
    getScore(){
        return parseInt(this.score);
    },
    //分数写到本地（当前分 最高分 历史记录）
    updateScore(){

    },
    //炸弹清除敌机
    getUfoBomb(){

    },
    //游戏结束
    gameOver(){
        cc.log("游戏结束！！！");
        this.pauseAction();
        this.updateScore();

        cc.director.loadScene("start");
    },
    onDestroy (){
        D.main = null;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
