/**
 *
 * @author
 *
 */
var FightLogic = (function (_super) {
    __extends(FightLogic, _super);
    function FightLogic() {
        _super.call(this);
    }
    var d = __define,c=FightLogic,p=c.prototype;
    FightLogic.getInstance = function () {
        if (this.instance == null) {
            this.instance = new FightLogic();
        }
        return this.instance;
    };
    p.startFight = function (mission_id) {
    };
    return FightLogic;
}(egret.EventDispatcher));
egret.registerClass(FightLogic,'FightLogic');
