/**
 *
 * @author 
 *
 */
class MainMapBg extends eui.Group {
    private mission_btn_arr: MissionBtn[];

    private chapter_id: number
    private vo:StoryChapterVO;
    private data_length:number = 3;

    public constructor() {
        super();
        this.chapter_id = 1;
        this.once(egret.Event.ADDED_TO_STAGE,this.onStage,this);
    }

    private onStage(): void {
        this.vo = StoryLogic.getInstance().getStoryChapterVOByID(this.chapter_id);

        this.mission_btn_arr = [];

        var img: egret.Texture = RES.getRes("map_" + this.chapter_id + "_png");
        this.addChild(new egret.Bitmap(img));
        for(var i: number = 0;i < this.vo.mission_lists.length;i++) {
            /**状态 0锁定 1开启 2通关*/
            var state: number = i+1 < StoryLogic.getInstance().current_missionListID ? StoryLogic.MISSION_STATE_FINISH :
                (i+1 == StoryLogic.getInstance().current_missionListID ? StoryLogic.MISSION_STATE_WANTED : StoryLogic.MISSION_STATE_LOCK);
            var v:MissionListVO = StoryLogic.getInstance().getMissionListVOByID(parseInt(this.vo.mission_lists[i]));
            v.chapter_id = this.vo.id;
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
