/**
 *
 * @author 
 *
 */
class MissionBtn extends eui.Group {
    private bg_circle: egret.Bitmap;
    private tween_circle: egret.Bitmap;
    private lock_bmp: egret.Bitmap;

    private tw: egret.Tween;
    private vo: MissionListVO;
    private btn_width: number;
    /**状态 0锁定 1开启 2通关*/
    private state: number;

    public constructor(v:MissionListVO,state: number = 0) {
        super();
        this.vo = v;
        this.btn_width = parseInt(v.mission_data[2]);
        this.state = state;
        this.anchorOffsetX = this.btn_width / 2;
        this.anchorOffsetY = this.btn_width / 2;
        this.init();
    }

    private init(): void {
        this.bg_circle = new egret.Bitmap(RES.getRes("btnbg_png"));
        this.tween_circle = new egret.Bitmap(RES.getRes("btnbg_png"));
        this.lock_bmp = new egret.Bitmap(RES.getRes("main_03_png"));

        this.bg_circle.smoothing = this.tween_circle.smoothing = this.lock_bmp.smoothing = true;
        this.bg_circle.anchorOffsetX = this.bg_circle.anchorOffsetY = this.bg_circle.width / 2;
        this.tween_circle.anchorOffsetX = this.tween_circle.anchorOffsetY = this.tween_circle.width / 2;
        this.lock_bmp.anchorOffsetX = this.lock_bmp.anchorOffsetY = this.lock_bmp.width / 2;
        this.bg_circle.x = this.bg_circle.y = this.lock_bmp.x = this.tween_circle.x = this.tween_circle.y = this.btn_width / 2;
        this.lock_bmp.y = this.bg_circle.y;

        this.addChild(this.bg_circle);
        this.addChild(this.tween_circle);
        this.addChild(this.lock_bmp);

        if(this.state == StoryLogic.MISSION_STATE_LOCK) {
            this.tween_circle.visible = false;
        }
        else if(this.state == StoryLogic.MISSION_STATE_WANTED) {
            this.lock_bmp.visible = false;
            this.bg_circle.scaleX = this.bg_circle.scaleY = (this.btn_width + 20) / this.bg_circle.width;

            var s1: number = (this.btn_width + 0) / this.tween_circle.width;
            var s2: number = (this.btn_width - 15) / this.tween_circle.width;
            this.tween_circle.scaleX = this.tween_circle.scaleY = s1;
            if(this.tw == null) {
                this.tw = egret.Tween.get(this.tween_circle,{ loop: true });
            }
            this.tw.to({ scaleX: s2,scaleY: s2 },800).to({ scaleX: s1,scaleY: s1 },800);
        }
        else {
            this.lock_bmp.visible = false;
            this.tween_circle.visible = false;
            this.bg_circle.alpha = 0;
        }

        this.once(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickMission,this);
    }

    private clickMission(e: egret.TouchEvent): void {
        if(this.state != StoryLogic.MISSION_STATE_LOCK) {
            UIManager.getInstance().openSecondUI(new MissionListUI(this.vo)); 
        }
    }

    private clear(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickMission,this);
        egret.Tween.removeTweens(this.tween_circle);
        this.removeChildren();
        this.bg_circle = null;
        this.tween_circle = null;
        this.lock_bmp = null;
    }
}
