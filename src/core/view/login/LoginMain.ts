/**
 *
 * @author 
 *
 */
class LoginMain extends BaseFirstUI {

    private btn: BaseButton;
    private server_name: eui.Label;
    private server_select: eui.Label;
    private server_select_ui: ServerSelectUI;

    private server_select_num: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/LoginMainSkin.exml";
    }

    protected createChildren() {
        super.createChildren();
        this.btn = new BaseButton("startgame_png");
        this.btn.horizontalCenter = 0;
        this.btn.y = this.server_name.y + 80;
        this.addChild(this.btn);
        this.btn.startTween();
        
        this.initEvent();
    }

    private initEvent(): void {
        this.server_select.addEventListener(egret.TouchEvent.TOUCH_TAP,this.popServerSelect,this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
        UIManager.getInstance().addEventListener("closeServerSelect",this.closeServerSelect,this);
        this.once(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
    }

    private setServer(index,name): void {
        this.server_select_num = index;
        this.server_name.text = index + "区  " + name;
    }

    private click(e: egret.Event): void {
        var event: MyUIEvent = new MyUIEvent(MyUIEvent.LOGIN_SUCCESS);
        event.data = this.server_select_num;
        UIManager.getInstance().dispatchEvent(event);
    }

    private popServerSelect(e: egret.TouchEvent): void {
        this.server_select_ui.visible = true;
        this.btn.visible = false;
        e.stopImmediatePropagation();
        
//        HttpCommand.getInstance().test();
    }

    private closeServerSelect(e: egret.Event): void {
        this.server_select_ui.visible = false;
        this.btn.visible = true;
        if(e.data.index != -1) {
            this.setServer(e.data.index,e.data.name);
        }
    }

    private clear(): void {
        this.server_select.addEventListener(egret.TouchEvent.TOUCH_TAP,this.popServerSelect,this);
        UIManager.getInstance().addEventListener("closeServerSelect",this.closeServerSelect,this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
        if(this.btn.parent != null) {
            this.btn.parent.removeChild(this.btn);
        }
        if(this.server_select_ui.parent != null) {
            this.server_select_ui.parent.removeChild(this.server_select_ui);
        }
        this.btn = null;
    }
}
