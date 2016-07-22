/**
 *
 * @author 
 *
 */
class FightMainUI extends eui.Component{
	public constructor() {
    	super();
        this.skinName = "FightMainSkin";
	}
	
    protected childrenCreated():void
	{
	    super.childrenCreated();
	    
	    this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
	}
	
	private fightOver():void
	{
	    FightLogic.getInstance().fightOver();
	}
	
	private click():void
	{
	    this.fightOver();
	}
	
	private clear():void
	{
	
	}
}
