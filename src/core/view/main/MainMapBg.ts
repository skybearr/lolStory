/**
 *
 * @author 
 *
 */
class MainMapBg extends eui.Group {
    private mission_btn_arr: MissionBtn[];

    private chapter_id: number
    private current_mission: number;//当前的大关卡  为/15的ceil
    private mission_num: number;
    private mission_data: number[];

    public constructor() {
        super();
        this.chapter_id = 1;
        this.once(egret.Event.ADDED_TO_STAGE,this.onStage,this);
    }

    private onStage(): void {
        this.mission_data = StoryLogic.getInstance().chapter_data[this.chapter_id - 1];
        this.mission_num = this.mission_data.length / 3;

        this.current_mission = this.chapter_id == StoryLogic.getInstance().current_chapterID ?
            Math.ceil(StoryLogic.getInstance().current_missionID / StoryLogic.MISSION_LIST_NUM) - 1 : 999;//如果是以前的章节，全部已通关
        this.mission_btn_arr = [];

        var img: egret.Texture = RES.getRes("map_" + this.chapter_id + "_png");
        this.addChild(new egret.Bitmap(img));
        for(var i: number = 0;i < this.mission_num;i++) {
            /**状态 0锁定 1开启 2通关*/
            var state: number = i < this.current_mission ? StoryLogic.MISSION_STATE_FINISH :
                (i == this.current_mission ? StoryLogic.MISSION_STATE_WANTED : StoryLogic.MISSION_STATE_LOCK);
            var mission = new MissionBtn(i,this.mission_data[i * 3 + 2],state);
            mission.x = this.mission_data[i * 3];
            mission.y = this.mission_data[i * 3 + 1];
            this.addChild(mission);
            this.mission_btn_arr.push(mission);
        }
    }

    private clickMoreGame(e: TouchEvent): void {
        SoundManager.getInstance().playEffectSound();
        UIManager.getInstance().popMessage(StringConst.String_00002,UIConst.POP_MESSAGE_TYPE_WINDOW);
    }

    private clear(): void {
        this.removeChildren();
        this.mission_btn_arr = null;
        this.mission_data = null;
    }
}
