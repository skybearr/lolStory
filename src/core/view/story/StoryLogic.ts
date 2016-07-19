/**
 *
 * @author 
 *
 */
class StoryLogic extends egret.EventDispatcher{
	public constructor() {
    	super();
	}
	
    private static instance: StoryLogic;
    public static getInstance(): StoryLogic {
        if(this.instance == null) {
            this.instance = new StoryLogic();
        }
        return this.instance;
    }
    
    public static MISSION_STATE_LOCK: number = 0;
    public static MISSION_STATE_WANTED: number = 1;
    public static MISSION_STATE_FINISH: number = 2;
    
    public static MISSION_ITEM_STATE_LOCK: number = 0;
    public static MISSION_ITEM_STATE_WANTED: number = 1;
    public static MISSION_ITEM_STATE_FINISH: number = 2;
    
    /**没一个大关卡中小关卡的数量*/
    public static MISSION_LIST_NUM  :number = 15;
    
    /**大章节数据*/
    public chapter_data_arr:StoryChapterVO[];
    /**大关卡数据*/
    public mission_list_data_arr: MissionListVO[];
    /**小关卡数据*/
    public mission_data_arr: MissionVO[];
                            
    /**当前已经打到的最新章节*/
    public current_chapterID: number = 1;
    /**当前已经打到的最新关卡*/
    public current_missionID: number = 2;
                 
    /**初始化配置里的数据*/
    public initData():void
    {
        this.chapter_data_arr = [];
        var arr:Object[] = RES.getRes("story_chapter_json");
        for(var i:number=0;i<arr.length;i++){
            var vo:StoryChapterVO = new StoryChapterVO();
            var o:Object = arr[i];
            vo.id = o['charpter_id'];
            vo.name = o['name'];
            vo.mission_lists = o['mission_lists'].split(",");
            this.chapter_data_arr.push(vo);
        }
        
        this.mission_list_data_arr = [];
        arr = RES.getRes("story_mission_list_json");
        for(var i: number = 0;i < arr.length;i++) {
            var v: MissionListVO = new MissionListVO();
            var o: Object = arr[i];
            v.id = o['mission_list_id'];
            v.name = o['name'];
            v.mission_data = o['mission_data'].split(",");
            v.bg = o['bg'];
            v.mission_ids = o['mission_ids'].split(",");
            this.mission_list_data_arr.push(v);
        }
        
        this.mission_data_arr = [];
        arr = RES.getRes("story_mission_json");
        for(var i: number = 0;i < arr.length;i++) {
            var vv: MissionVO = new MissionVO();
            var o: Object = arr[i];
            vv.id = o['id'];
            vv.name = o['name'];
            vv.icon = o['icon'];
            vv.avg_id = o['avg_id'];
            vv.monster_ids = o['monster_ids'].split(",");
            this.mission_data_arr.push(vv);
        }
    }
    
    public getStoryChapterVOByID(id: number): StoryChapterVO {
        return this.chapter_data_arr[id - 1];
    }
    public getMissionListVOByID(id: number): MissionListVO {
        return this.mission_list_data_arr[id - 1];
    }
    public getMissionVOByID(id: number): MissionVO {
        return this.mission_data_arr[id - 1];
    }
    
    public openStory():void
    {
        //获取网络数据，得到关卡信息
        this.current_chapterID = 1;
        this.current_missionID = 2;
        
        this.openUI();
    }
    
    private openUI():void
    {
        UIManager.getInstance().openFirstUI(UIManager.CLASS_UI_INDEX_STORY,TweenManager.TWEEN_UI_MOVE);
    }
}
