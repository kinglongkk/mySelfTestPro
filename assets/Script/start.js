cc.Class({
    extends: cc.Component,

    properties: {
        game_loading: {
            default: null,
            type: cc.Node,
            displayName: "游戏加载中"
        }
    },

    // use this for initialization
    onLoad: function () {
        /*var gameLoading = this.game_loading.getComponent(cc.Animation);
        gameLoading.play();*/
        // cc.director.preloadScene("main");
    },
    //开始游戏
    startGame(){
        cc.director.loadScene("main", ()=>{
            cc.log("main is loaded");
        })
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
