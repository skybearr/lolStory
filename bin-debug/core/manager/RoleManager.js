/**
 *
 * @author
 *
 */
var RoleManager = (function (_super) {
    __extends(RoleManager, _super);
    function RoleManager() {
        _super.call(this);
        this.attack = 30;
    }
    var d = __define,c=RoleManager,p=c.prototype;
    RoleManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new RoleManager();
        }
        return this.instance;
    };
    return RoleManager;
}(egret.EventDispatcher));
egret.registerClass(RoleManager,'RoleManager');
