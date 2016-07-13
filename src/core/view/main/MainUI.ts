/**
 *
 * @author 
 *
 */
class MainUI extends eui.Group {
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
	    this.initRoleInfo();
	    this.initMap();
	    this.initButtons();
	}
	
	private initRoleInfo(){
	    
	}
	
	private initMap(){
	    
	}
	
	private initButtons(){
	    
	}
	
	private initEvent():void
	{
	    
	}
	
}
