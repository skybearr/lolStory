/**
 *
 * @author 
 *
 */
class ServerSelectItem extends eui.Component{
    
    private server_num:eui.Label;
    private server_name:eui.Label;
    private server_isnew:eui.Label;
    
    private index:number;
    private nam:string;
    private isNew:boolean;
    
	public constructor(index,name,isNew) {
    	  super();
        this.index = index;
        this.nam = name;
        this.isNew = isNew;
        this.skinName = "resource/skins/ServerSelectItemSkin.exml";
        this.init();
	}
	
    private init() {
        this.server_num.text = this.index + "区";
        this.server_name.text = this.nam;
        this.server_isnew.text = this.isNew ? "新服" : "";
        this.server_num.y = this.server_name.y = this.server_isnew.y = (this.height - this.server_num.height)/2;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectItem,this);
    }
    
    private selectItem(e:egret.TouchEvent):void
    {
        var event: egret.Event = new egret.Event("closeServerSelect");
        event.data = { index: this.index,name: this.nam};
        UIManager.getInstance().dispatchEvent(event);
    }
    
    public clear():void
    {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.selectItem,this);
    }
	
}
