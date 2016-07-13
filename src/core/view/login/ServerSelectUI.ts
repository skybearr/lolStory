/**
 *
 * @author 
 *
 */
class ServerSelectUI extends eui.Component {

    private close_btn: eui.Image;
    private itemCon: eui.Group;
    private scroller: eui.Scroller;
    private itemArr: Array<ServerSelectItem>;

    public constructor() {
        super();
        this.skinName = "resource/skins/ServerSelectSkin.exml";
    }
    
    protected childrenCreated() {
        super.childrenCreated();
        
        this.itemArr = [];        
        this.initItems();
        
        this.once(egret.Event.REMOVED_FROM_STAGE,this.removeFromStage,this);
        this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
    }

    private initItems(): void {
        for(var i: number = 1;i <= 20;i++) {
            var item: ServerSelectItem = new ServerSelectItem(i,"第" + i + "个服务器",i == 20);
            item.y = (item.height + 5) * (20 - i);
            this.itemCon.addChild(item);
            this.itemArr.push(item);
        }
        this.scroller.height = this.itemArr.length > 5 ? 280 : this.itemArr.length * (item.height + 3);
    }

    private close(e: egret.Event): void {
        var event: egret.Event = new egret.Event("closeServerSelect");
        event.data = { index: -1,name: "" };
        UIManager.getInstance().dispatchEvent(event);
    }

    private removeFromStage(e: egret.Event): void {
        this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
        for(var i: number = 0;i < this.itemArr.length;i++) {
            this.itemArr[i].clear();
            this.itemArr[i] = null;
        }
        this.itemArr = null;
        this.scroller.viewport = null;
        this.scroller = null;
        this.itemCon = null;
    }

}
