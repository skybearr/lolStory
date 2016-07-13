/**
 *
 * @author
 *
 */
var MainUI = (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        _super.call(this);
        this.once(egret.Event.ADDED_TO_STAGE, this.onStage, this);
    }
    var d = __define,c=MainUI,p=c.prototype;
    p.onStage = function () {
        this.initRoleInfo();
        this.initMap();
        this.initButtons();
        this.initEvent();
    };
    p.initRoleInfo = function () {
    };
    p.initMap = function () {
    };
    p.initButtons = function () {
    };
    p.initEvent = function () {
    };
    return MainUI;
}(eui.Group));
egret.registerClass(MainUI,'MainUI');
