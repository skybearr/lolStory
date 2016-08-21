/**
 *
 * @author 
 *
 */
class EmbattleUI extends BaseSecondUI{
    private close_btn: BaseButton;
	public constructor() {
    	super();
    	this.skinName = "EmbattleSkin";
	}
	
    protected childrenCreated(): void
    {
        super.childrenCreated();

        this.close_btn = new BaseButton("b1_png", "b2_png", "关闭");
        this.close_btn.x = this.width - 80;
        this.close_btn.y = 15;
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
