/**
 *
 * @author 
 *
 */
class FightLogic extends egret.EventDispatcher {
    public constructor() {
        super();
    }

    private static instance: FightLogic;
    public static getInstance(): FightLogic {
        if(this.instance == null) {
            this.instance = new FightLogic();
        }
        return this.instance;
    }

    
    private current_mission_vo:MissionVO;
    
    /**开始战斗流程，第一步，判断是否需要显示剧情*/
    public startFightInStory(vo: MissionVO): void {
        //判断是否需要播放剧情
        this.current_mission_vo = vo;
        this.once(MyUIEvent.LOAD_FIGHT_AND_AVG_SOURCE,this.loadSourceComplete,this);
        //组装需要加载的资源
        var groupname: string = "fight_source" + vo.mission_id;
        var keys: string[] = [];
        if(StoryLogic.getInstance().needAvg(vo.mission_id)) {
            keys = keys.concat(StoryLogic.getInstance().getSourceKeysByID(vo.avg_id));
        }
        keys = keys.concat(this.getSourceKeysByID(vo.monster_ids));
        LoadManager.getInstance().addEventListener(MyUIEvent.LOAD_FIGHT_AND_AVG_SOURCE,this.loadSourceComplete,this);
        LoadManager.getInstance().startLoad(groupname,keys,MyUIEvent.LOAD_FIGHT_AND_AVG_SOURCE);
    }

    private loadSourceComplete(e:MyUIEvent):void
    {
        if(this.current_mission_vo != null)
        {
            if(StoryLogic.getInstance().needAvg(this.current_mission_vo.mission_id)) {
                AVGLogic.getInstance().startAVG(this.current_mission_vo.avg_id);
            }
            else {
                this.startFightReal();
            }
        }
    }
    
    public startFightReal():void
    {
        UIManager.getInstance().storyCon.addChild(new FightMainUI());
    }
    
    private getSourceKeysByID(ids:string[]):string[]
    {
        var keys:string[] = [];
        
        return keys;
    }

}
