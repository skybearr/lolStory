/**
 *
 * @author
 *
 */
var LoginMain = (function (_super) {
    __extends(LoginMain, _super);
    function LoginMain() {
        _super.call(this);
        this.skinName = "resource/skins/LoginMainSkin.exml";
    }
    var d = __define,c=LoginMain,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.btn = new BaseButton("startgame_png");
        this.btn.horizontalCenter = 0;
        this.btn.y = this.server_name.y + 80;
        this.addChild(this.btn);
        this.btn.startTween();
        this.initEvent();
    };
    p.initEvent = function () {
        this.server_select.addEventListener(egret.TouchEvent.TOUCH_TAP, this.popServerSelect, this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        UIManager.getInstance().addEventListener("closeServerSelect", this.closeServerSelect, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    p.setServer = function (index, name) {
        this.server_select_num = index;
        this.server_name.text = index + "区  " + name;
    };
    p.click = function (e) {
        var event = new MyUIEvent(MyUIEvent.LOGIN_SUCCESS);
        event.data = this.server_select_num;
        UIManager.getInstance().dispatchEvent(event);
    };
    p.popServerSelect = function (e) {
        this.server_select_ui.visible = true;
        this.btn.visible = false;
        e.stopImmediatePropagation();
        //        HttpCommand.getInstance().test();
    };
    p.closeServerSelect = function (e) {
        this.server_select_ui.visible = false;
        this.btn.visible = true;
        if (e.data.index != -1) {
            this.setServer(e.data.index, e.data.name);
        }
    };
    p.clear = function () {
        this.server_select.addEventListener(egret.TouchEvent.TOUCH_TAP, this.popServerSelect, this);
        UIManager.getInstance().addEventListener("closeServerSelect", this.closeServerSelect, this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        if (this.btn.parent != null) {
            this.btn.parent.removeChild(this.btn);
        }
        if (this.server_select_ui.parent != null) {
            this.server_select_ui.parent.removeChild(this.server_select_ui);
        }
        this.btn = null;
    };
    return LoginMain;
}(BaseFirstUI));
egret.registerClass(LoginMain,'LoginMain');
