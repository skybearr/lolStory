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
	
	private onStage(){
	    this.initRoleInfo();
	    this.initMap();
	    this.initButtons();
	    this.initEvent();
	}
	
	private initRoleInfo(){
	    
	}
	
	private initMap(){
	    
	}
	
	private initButtons(){
	    
	}
	
	private initEvent(){
	    
	}
	
}
