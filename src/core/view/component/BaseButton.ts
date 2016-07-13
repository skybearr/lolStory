/**
 *
 * @author 
 *
 */
class BaseButton extends eui.Group{
    private src_str:string;
    private src:eui.Image;
	public constructor(srcstr:string) {
    	super();
    	this.src_str = srcstr;
	}
	
    protected childrenCreated()
    {
        super.childrenCreated();
        var img: egret.Texture = RES.getRes(this.src_str);
        var b:eui.Image = new eui.Image(img);
        this.addChild(b);
        
        this.once(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
	}
	
	public startTween():void
	{
        var oldY: number = this.y;
        var tw = egret.Tween.get(this,{loop:true});
        tw.to({ y: this.y + 20},500)
            .to({ y: oldY},500).wait(100);
	}
	
	public clear():void
	{
        egret.Tween.removeTweens(this);
        this.removeChildren();
        this.src_str = null;
        this.src = null;
	}
}
