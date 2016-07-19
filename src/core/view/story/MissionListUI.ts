/**
 *
 * @author 
 *
 */
class MissionListUI extends BaseSecondUI{
    private bg:eui.Group;
    private back_btn: eui.Label;
    private title_txt: eui.Label;
    private mission_list_con: eui.Group;

    private mission_arr: MissionItemUI[];
    private vo: MissionListVO;
    /**当前最新关卡*/
    private newest_mission_id: number;
    /**当前点击的小关卡*/
    private click_mission_item: MissionItemUI;
    /**当前最新的小关卡*/
    private current_mission_item: MissionItemUI;
    private finger: eui.Image;

    /**设置关卡
	 * @param mission_id 当前点击的关卡id 1开始*/
    public constructor(mission_id: number) {
        super();
        this.vo = StoryLogic.getInstance().getMissionListVOByID(mission_id);
        this.skinName = "MissionListSkin";
        this.once(egret.Event.ADDED_TO_STAGE,this.onStage,this);
    }

    private onStage(e: egret.Event): void {
        this.newest_mission_id = StoryLogic.getInstance().current_missionID;

        RES.getResAsync(this.vo.bg,this.loadBg,this);
        
        this.mission_list_con = new eui.Group();
        this.mission_list_con.horizontalCenter = 0;
        this.mission_list_con.top = 200;
        this.addChild(this.mission_list_con);
        this.mission_arr = [];
        
        for(var i: number = 0;i < this.vo.mission_ids.length;i++) {
            var star: number = i % 4;
            var state: number = this.getState(i);
            var v:MissionVO = StoryLogic.getInstance().getMissionVOByID(parseInt(this.vo.mission_ids[i]));
            var item: MissionItemUI = new MissionItemUI(v,star,state);
            item.name = i.toString();
            item.x = (item.width_set + 60) * (i % 3);
            item.y = (item.height_set + 10) * Math.floor(i / 3);
            if(state == StoryLogic.MISSION_ITEM_STATE_WANTED) {
                this.current_mission_item = item;
            }
            this.mission_list_con.addChild(item);
            this.mission_arr.push(item);
            item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickItem,this);
        }

        if(this.current_mission_item != null) {
            this.addCurrentHand();
        }
        this.initEvent();
    }
    
    private loadBg(data,key):void
    {
        var img = new eui.Image(data);
        img.smoothing = true;
        img.width = GlobalData.GameStage_width;
        img.height = GlobalData.GameStage_height;
        img.alpha = 0.8;
        this.bg.addChild(img);
    }

    private addCurrentHand(): void {
        var ww: number;
        if(this.finger == null) {
            var texture: egret.Texture = RES.getRes("finger_png");
            this.finger = new eui.Image(texture);
            this.finger.anchorOffsetX = texture.textureWidth / 2;
            this.finger.anchorOffsetY = texture.textureHeight / 2;
            this.finger.scaleX = this.finger.scaleY = 0.7;
            this.finger.smoothing = true;
        }
        //eui的localToGlobal好坑啊 全靠凑啊
        this.finger.x = this.current_mission_item.x + this.current_mission_item.width_set + 100;
        this.finger.y = this.current_mission_item.y + this.current_mission_item.height_set - 34 + this.mission_list_con.top;
        this.addChild(this.finger);
        this.finger.touchEnabled = false;
        var tw = egret.Tween.get(this.finger,{ loop: true });
        tw.to({ scaleX: 0.5,scaleY: 0.5 },400).to({ scaleX: 0.7,scaleY: 0.7 },400);
    }

    /**获取小关卡的状态  i 小关卡的索引 0-14*/
    private getState(i: number): number {
        return 1;
        if(this.charter_id < StoryLogic.getInstance().current_chapterID)//以前的章节
        {
            return StoryLogic.MISSION_ITEM_STATE_FINISH;
        }
        else {
            var index: number = Math.floor((this.newest_mission_id - 1) / StoryLogic.MISSION_LIST_NUM);//当前的大关卡
            if(this.mission_index < index) {
                return StoryLogic.MISSION_ITEM_STATE_FINISH;
            }
            else if(this.mission_index == index)//当前大关卡
            {
                if(i < (this.newest_mission_id - 1) % 15) {
                    return StoryLogic.MISSION_ITEM_STATE_FINISH;
                }
                else if(i == (this.newest_mission_id - 1) % 15) {
                    return StoryLogic.MISSION_ITEM_STATE_WANTED;
                }
                else {
                    return StoryLogic.MISSION_ITEM_STATE_LOCK;
                }

            }
            else {
                return StoryLogic.MISSION_ITEM_STATE_LOCK;
            }
        }
        
    }

    private initEvent(): void {
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this);
//        StoryLogic.getInstance().addEventListener(MyUIEvent.UPDATE_MISSION_ITEM,this.updateMissionItemUI,this);
        this.once(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
    }

    private updateMissionItemUI(e: MyUIEvent): void {
        if(this.click_mission_item != null) {
//            this.click_mission_item.changeState(StoryLogic.MISSION_ITEM_STATE_WANTED,3);
        }
        //	    if(this.current_mission_item != null && e.data.id == this.current_mission_item.mission_id)
        //        {
        //            this.current_mission_item.changeState(StoryLogic.MISSION_ITEM_STATE_FINISH,0);
        //        }
    }

    private clickBack(e: TouchEvent): void {
        SoundManager.getInstance().playEffectSound();
        if(this.parent != null) {
            this.parent.removeChild(this);
        }
    }

    private clickItem(e: egret.TouchEvent): void {
        SoundManager.getInstance().playEffectSound();

        this.click_mission_item = e.currentTarget as MissionItemUI;

        var n: number = parseInt(e.currentTarget.name);

//        if((e.currentTarget as MissionItemUI).state == StoryLogic.MISSION_ITEM_STATE_LOCK) {
//            console.log("点击第" + this.charter_id + "章节 第" + (this.mission_index + 1) + "关卡 第" + n + "小关此关卡还没开通");
//        }
//        else {
//            console.log("点击第" + this.charter_id + "章节 第" + (this.mission_index + 1) + "关卡 第" + n + "小关");
//            UIManager.getInstance().startFight(this.charter_id * 100 + n);
//        }
    }

    private clear(e: egret.Event): void {
        this.removeChildren();
        this.back_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this);
//        StoryLogic.getInstance().removeEventListener(MyUIEvent.UPDATE_MISSION_ITEM,this.updateMissionItemUI,this);
//        for(var i: number;i < this.mission_arr.length;i++) {
//            this.mission_arr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickItem,this);
//        }
//        this.back_btn = null;
//        this.mission_id_img = null;
//        this.title_bg = null;
//        this.mission_arr = null;
    }
}
