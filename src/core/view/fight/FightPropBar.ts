/**
 *
 * @author 
 *
 */
class FightPropBar extends eui.Component
{
    private txt:eui.Label;
    private bar:eui.Rect;
    private bg:eui.Image;
    
    private type:number;
    private value:number;
    private max:number;
    
    public constructor(t:number,v:number)
    {
        super();
        this.type = t;
        this.value = v;
        this.max = FightLogic.getInstance().getMaxPropValueByType(t);
        this.skinName = "FightPropBarSkin";
    }
    
    protected childrenCreated():void{
        super.childrenCreated();
        
        this.initData();
    }
    
    public update(v:number):void
    {
        this.value = v;
        this.initData();
    }
    
    private initData():void
    {
        this.txt.text = "ATK";
        this.bar.width = this.value / this.max * this.bg.texture.textureWidth;
    }
}
