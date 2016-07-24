/**
 *
 * @author 
 *
 */
class FightHpBarItem extends eui.Group{
    private img:eui.Image;
    
    private index:number;
	public constructor(index:number) {
    	super();
    	this.index = index;
	}
	
	protected childrenCreated():void
	{
	    super.childrenCreated();
	    
	    var type:number = Math.floor(this.index / 40) + 1;
        this.img = new eui.Image(RES.getRes("hp_bar" + type + "_png"));
        this.addChild(this.img);
	}
	
    public clear(): void {
        if(this.index <= 39) {
            this.img.texture = RES.getRes("hp_bar0_png");
        }
        else {
            if(this.parent != null) {
                this.parent.removeChild(this);
            }
        }
    }
}
