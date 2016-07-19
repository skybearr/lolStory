/**
 *
 * @author 
 *
 */
class MainMapBg extends eui.Group {
    private mission_btn_arr: MissionBtn[];

    private chapter_id: number
    private current_mission: number;//当前的大关卡  为/15的ceil
    private vo:StoryChapterVO;
    private data_length:number = 3;

    public constructor() {
        super();
        this.chapter_id = 1;
        this.once(egret.Event.ADDED_TO_STAGE,this.onStage,this);
    }

    private onStage(): void {
        this.vo = StoryLogic.getInstance().getStoryChapterVOByID(this.chapter_id);

        this.current_mission = this.chapter_id == StoryLogic.getInstance().current_chapterID ?
            Math.ceil(StoryLogic.getInstance().current_missionID / StoryLogic.MISSION_LIST_NUM) - 1 : 999;//如果是以前的章节，全部已通关
        this.mission_btn_arr = [];

        var img: egret.Texture = RES.getRes("map_" + this.chapter_id + "_png");
        this.addChild(new egret.Bitmap(img));
        for(var i: number = 0;i < this.vo.mission_lists.length;i++) {
            /**状态 0锁定 1开启 2通关*/
            var state: number = i < this.current_mission ? StoryLogic.MISSION_STATE_FINISH :
                (i == this.current_mission ? StoryLogic.MISSION_STATE_WANTED : StoryLogic.MISSION_STATE_LOCK);
            var v:MissionListVO = StoryLogic.getInstance().getMissionListVOByID(parseInt(this.vo.mission_lists[i]));
            var mission = new MissionBtn(v,state);
            mission.x = parseInt(v.mission_data[0]);
            mission.y = parseInt(v.mission_data[1]);
            this.addChild(mission);
            this.mission_btn_arr.push(mission);
        }
    }

    private clear(): void {
        this.removeChildren();
        this.mission_btn_arr = null;
    }
}
