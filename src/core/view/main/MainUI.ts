/**
 *
 * @author 
 *
 */
class MainUI extends BaseFirstUI {
    private role:RoleInfoUI;
    private map:MainMapBg;
    private buttons:MainButtons;
	public constructor() {
    	super();
    	this.once(egret.Event.ADDED_TO_STAGE,this.onStage,this);
	}
	
	private onStage(e:egret.Event):void
	{
	    this.init();
	    this.initEvent();
	}
	
	private init():void
	{
        this.initMap();
	    this.initRoleInfo();
	    this.initButtons();
	}
	
	private initRoleInfo(){
    	  this.role = new RoleInfoUI();
	    this.addChild(this.role);
	}
	
	private initMap(){
	    this.map = new MainMapBg();
	    this.addChild(this.map);
	}
	
	private initButtons(){
	    this.buttons = new MainButtons();
	    this.addChild(this.buttons);
	}
	
	private initEvent():void
	{
	    
	}
	
}
