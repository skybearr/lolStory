/**
 *
 * @author
 *
 */
var ServerSelectUI = (function (_super) {
    __extends(ServerSelectUI, _super);
    function ServerSelectUI() {
        _super.call(this);
        this.skinName = "resource/skins/ServerSelectSkin.exml";
    }
    var d = __define,c=ServerSelectUI,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.itemArr = [];
        this.initItems();
        this.once(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
        this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    p.initItems = function () {
        for (var i = 1; i <= 20; i++) {
            var item = new ServerSelectItem(i, "第" + i + "个服务器", i == 20);
            item.y = (item.height + 5) * (20 - i);
            this.itemCon.addChild(item);
            this.itemArr.push(item);
        }
        this.scroller.height = this.itemArr.length > 5 ? 280 : this.itemArr.length * (item.height + 3);
    };
    p.close = function (e) {
        var event = new egret.Event("closeServerSelect");
        event.data = { index: -1, name: "" };
        UIManager.getInstance().dispatchEvent(event);
    };
    p.removeFromStage = function (e) {
        this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        for (var i = 0; i < this.itemArr.length; i++) {
            this.itemArr[i].clear();
            this.itemArr[i] = null;
        }
        this.itemArr = null;
        this.scroller.viewport = null;
        this.scroller = null;
        this.itemCon = null;
    };
    return ServerSelectUI;
}(eui.Component));
egret.registerClass(ServerSelectUI,'ServerSelectUI');
