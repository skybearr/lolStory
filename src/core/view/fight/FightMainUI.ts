/**
 *
 * @author 
 *
 */
class FightMainUI extends eui.Component{
    private bg:eui.Group;
    private title:eui.Label;
    private 
    
    private vo:FightVO;
    
    
	public constructor(vo:FightVO) {
    	super();
    	this.vo = vo;
        this.skinName = "FightMainSkin";
        this.once(egret.Event.ADDED_TO_STAGE, this.onStage, this);
	}
	
    private onStage(e: egret.Event): void
    {
        RES.getResAsync(this.vo.bg, this.loadBg, this);
        
        this.initPlayers();
        this.initProps();

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
    }

    private loadBg(data, key): void
    {
        var img = new eui.Image(data);
        img.smoothing = true;
        img.width = GlobalData.GameStage_width;
        img.height = GlobalData.GameStage_height;
        img.alpha = 0.8;
        this.bg.addChild(img);
    }
    
    private initPlayers():void
    {
        
    }
	
	private initProps():void
	{
	    
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
