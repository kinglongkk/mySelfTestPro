cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        background1: cc.Node,
        background2: cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.background1.getPositionY() <= -cc.winSize.height / 2 + 20) {
            this.background1.setPositionY(cc.winSize.height / 2 + cc.winSize.height);
        } else {
            this.background1.setPositionY(this.background1.getPositionY() - 1);
        }
        if (this.background2.getPositionY() <= -cc.winSize.height / 2 + 20) {
            this.background2.setPositionY(cc.winSize.height / 2 + cc.winSize.height);
        } else {
            this.background2.setPositionY(this.background2.getPositionY() - 1);
        }
        cc.log(this.background1.getPositionY(), this.background2.getPositionY());
    },
});
