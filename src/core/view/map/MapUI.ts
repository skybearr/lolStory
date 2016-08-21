/**
 *
 * @author 
 *
 */
class MapUI extends BaseSecondUI{
    private close_btn: BaseButton;
    private bg: eui.Group;
    private map:eui.Image;
	public constructor() {
    	super();
    	this.skinName = "MapSkin";
        this.once(egret.Event.ADDED_TO_STAGE, this.onStage, this);
    }

    private onStage(e: egret.Event): void
    {
        RES.getResAsync("world_jpg", this.loadBg, this);
	}
	
    private loadBg(data, key): void
    {
        this.map = new eui.Image(data);
        this.map.right = 0;
        this.map.bottom = 0;
        this.bg.addChild(this.map);
    }
	
    protected childrenCreated(): void
    {
        super.childrenCreated();

        this.close_btn = new BaseButton("b1_png", "b2_png", "关闭");
        this.close_btn.x = this.width - 70;
        this.close_btn.y = 5;
        this.addChild(this.close_btn);

        this.initEvent();
    }

    private initEvent(): void
    {
        this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }

    private close(): void
    {
        UIManager.getInstance().closeSecondUI();
    }
}
