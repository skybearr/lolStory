/**
 *
 * @author
 *
 */
var ServerSelectItem = (function (_super) {
    __extends(ServerSelectItem, _super);
    function ServerSelectItem(index, name, isNew) {
        _super.call(this);
        this.index = index;
        this.nam = name;
        this.isNew = isNew;
        this.skinName = "resource/skins/ServerSelectItemSkin.exml";
        this.init();
    }
    var d = __define,c=ServerSelectItem,p=c.prototype;
    p.init = function () {
        this.server_num.text = this.index + "区";
        this.server_name.text = this.nam;
        this.server_isnew.text = this.isNew ? "新服" : "";
        this.server_num.y = this.server_name.y = this.server_isnew.y = (this.height - this.server_num.height) / 2;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectItem, this);
    };
    p.selectItem = function (e) {
        var event = new egret.Event("closeServerSelect");
        event.data = { index: this.index, name: this.nam };
        UIManager.getInstance().dispatchEvent(event);
    };
    p.clear = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectItem, this);
    };
    return ServerSelectItem;
}(eui.Component));
egret.registerClass(ServerSelectItem,'ServerSelectItem');
