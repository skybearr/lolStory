/**
 *
 * @author 
 *
 */
class LoginMain extends BaseFirstUI {

    private btn: BaseButton;
    private bg:eui.Image;
    private server_name: eui.Label;
    private server_select: eui.Label;
    private server_select_ui: ServerSelectUI;
    private select_profession_ui:SelectProfession;

    private server_select_num: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/LoginMainSkin.exml";
    }

    protected createChildren() {
        super.createChildren();
        this.btn = new BaseButton("startgame_png","startgame_png");
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
        this.bg.visible = this.server_name.visible = this.btn.visible
        this.server_select.visible = this.server_select_ui.visible = false;
        this.select_profession_ui = new SelectProfession(this.server_select_num);
        this.addChild(this.select_profession_ui);
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
        this.server_select_ui = null;
        this.btn = null;
        if(this.select_profession_ui.parent != null){
            this.select_profession_ui.parent.removeChild(this.select_profession_ui);
        }
        this.select_profession_ui = null;
    }
}
