/**
 *
 * @author
 *
 */
var BaseButton = (function (_super) {
    __extends(BaseButton, _super);
    function BaseButton(srcstr) {
        _super.call(this);
        this.src_str = srcstr;
    }
    var d = __define,c=BaseButton,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var img = RES.getRes(this.src_str);
        var b = new eui.Image(img);
        this.addChild(b);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    p.startTween = function () {
        var oldY = this.y;
        var tw = egret.Tween.get(this, { loop: true });
        tw.to({ y: this.y + 20 }, 500)
            .to({ y: oldY }, 500).wait(100);
    };
    p.clear = function () {
        egret.Tween.removeTweens(this);
        this.removeChildren();
        this.src_str = null;
        this.src = null;
    };
    return BaseButton;
}(eui.Group));
egret.registerClass(BaseButton,'BaseButton');
