cc.Class({
    extends: cc.Component,

    properties: {



        hero: {
            default: null,
            type: require("hero")
        },


        bulletGroup: {
            default: null,
            type: require("bulletGroup")
        }
    },

    // use this for initialization
    onLoad: function () {



        this.eState = D.commonInfo.gameState.start;
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

        this.bulletGroup.resumeAction();
        this.hero.onDrag();

    },
    //游戏暂停
    pauseAction(){

        this.bulletGroup.pauseAction();
        this.hero.offDrag();

    },
    //增加分数
    gainScore(scoreNo){

    },
    //get分数
    getScore(){

    },
    //分数写到本地（当前分 最高分 历史记录）
    updateScore(){

    },
    //炸弹清除敌机
    getUfoBomb(){

    },
    //游戏结束
    gameOver(){
        this.pauseAction();
        this.updateScore();
        // cc.director.loadScene("end");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
