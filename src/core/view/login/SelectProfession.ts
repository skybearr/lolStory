/**
 *
 * @author 
 *
 */
class SelectProfession extends eui.Component
{
    private username_txt:eui.Label;
    private sure_btn:eui.Button;
    private server_select_num:number;
	public constructor(server_num:number) {
    	super();
        this.server_select_num = server_num;
        this.skinName = "SelectProfessionSkin";
	}
	
    protected childrenCreated()
    {
        super.childrenCreated();
        
        this.sure_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sure,this);
        this.once(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
    }
        
    private sure():void
    {
        if(DataManager.getInstance().checkUserName(this.username_txt.text))
        {
            var event: MyUIEvent = new MyUIEvent(MyUIEvent.LOGIN_SUCCESS);
            event.data = { server: this.server_select_num,username: this.username_txt.text };
            UIManager.getInstance().dispatchEvent(event);
        } 
    }
    
    private clear():void
    {
        this.sure_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.sure,this);
    }
}
