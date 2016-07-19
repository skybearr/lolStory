/**
 *
 * @author 
 *
 */
class MissionItemUI extends eui.Group {
    private bg: eui.Image;
    private star: eui.Group;
    private lock: eui.Image;
    private mission_name: eui.Label;

    public width_set: number = 100;
    public height_set: number = 140;
    private bg_height: number = 100;
    public state: number;
    public vo:MissionVO;

    /**
     * @param id 显示的关卡数字
     * @param star 星数 如果锁定状态，则不显示，待打状态为0星
     * @param state 状态  0锁定 1代打 2通关*/
    public constructor(v:MissionVO,star: number,state: number) {
        super();
        this.vo = v;
        RES.getResAsync(this.vo.icon,this.loadBg,this);
        
        this.star = new eui.Group();
        this.star.horizontalCenter = 0;
        this.star.top = this.width_set + 18;
        this.addChild(this.star);

        this.changeState(state,star);
    }
    
    private loadBg(data,key):void
    {
        this.bg = new eui.Image(data);
        this.bg.smoothing = true;
        this.bg.width = this.width_set;
        this.bg.height = this.height_set - 40;
        this.addChildAt(this.bg,0);
    }

    public changeState(s: number,star_num: number): void {
        this.state = s;
        if(s == StoryLogic.MISSION_ITEM_STATE_LOCK) {//只有一个锁
            var t1: egret.Texture = RES.getRes("main_03_png");
            this.lock = new eui.Image(t1);
            this.lock.x = (this.width_set - t1.textureWidth) / 2;
            this.lock.y = (this.bg_height - t1.textureHeight) / 2;
            this.addChild(this.lock);
        }
        else if(s == StoryLogic.MISSION_ITEM_STATE_WANTED) {//当前关卡  星级为0
            this.addNumImage();
            this.changeStar(2);
        }
        else//已通关 星级正常显示
        {
            this.addNumImage();
            this.changeStar(star_num);
        }
    }

    private addNumImage(): void {
        if(this.mission_name == null) {
            this.mission_name = new eui.Label();
            this.mission_name.size = 20;
            this.mission_name.text = this.vo.name;
            this.mission_name.x = (this.width_set - this.mission_name.width) / 2;
            this.mission_name.y = (this.bg_height - this.mission_name.height) / 2;
            this.addChild(this.mission_name);
        }
    }

    public changeStar(n: number): void {
        this.star.removeChildren();
        for(var i: number = 0;i < 3;i++) {
            var t: egret.Texture = RES.getRes(i < n ? "star_a_png" : "star_b_png");
            var s: eui.Image = new eui.Image(t);
            s.anchorOffsetY = t.textureHeight / 2;
            s.x = (t.textureWidth + 2) * i;
            s.x = 35 * i;
            this.star.addChild(s);
        }
    }

    public clear(): void {
        this.star.removeChildren();
        this.bg = null;
        this.star = null;
        this.lock = null;
    }

}
