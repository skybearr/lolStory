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
    private monster_data_arr:MonsterVO[];
    
    /**初始化配置里的数据*/
    public initData(): void
    {
        this.monster_data_arr = [];
        var arr = RES.getRes("monster_list_json");
        for(var i: number = 0;i < arr.length;i++) {
            var vo: MonsterVO = new MonsterVO();
            var o: Object = arr[i];
            vo.id = o['id'];
            vo.name = o['name'];
            this.monster_data_arr.push(vo);
        }
    }
    
    /**根据类型获取这个属性的最大值设定*/
    public getMaxPropValueByType(t:number):number
    {
        return 100;
    }
    
    /**开始战斗流程，第一步，判断是否需要显示剧情*/
    public startFightInStory(vo: MissionVO): void {
        //判断是否需要播放剧情
        this.current_mission_vo = vo;
        //组装需要加载的资源
        var groupname: string = "fight_source" + vo.mission_id;
        var keys: string[] = [];
        if(StoryLogic.getInstance().needAvg(vo.mission_id)) {
            keys = keys.concat(StoryLogic.getInstance().getSourceKeysByID(vo.avg_id));
            if(vo.avg_over_id != 0)
            {
                keys = keys.concat(StoryLogic.getInstance().getSourceKeysByID(vo.avg_over_id));
            }
        }
        keys = keys.concat(this.getSourceKeysByID(vo.monster_ids));
        LoadManager.getInstance().addEventListener(MyUIEvent.LOAD_FIGHT_AND_AVG_SOURCE,this.loadSourceComplete,this);
        LoadManager.getInstance().startLoad(groupname,keys,MyUIEvent.LOAD_FIGHT_AND_AVG_SOURCE);
    }

    private loadSourceComplete(e:MyUIEvent):void
    {
        LoadManager.getInstance().removeEventListener(MyUIEvent.LOAD_FIGHT_AND_AVG_SOURCE, this.loadSourceComplete, this);
        if(this.current_mission_vo != null)
        {
            if(StoryLogic.getInstance().needAvg(this.current_mission_vo.mission_id)) {
                AVGLogic.getInstance().startAVG(this.current_mission_vo.avg_id,AVGLogic.BEGIN_AVG);
            }
            else {
                this.startFightReal();
            }
        }
    }
    
    public startFightReal():void
    {
        var vo:FightVO = new FightVO();
        vo.bg = this.current_mission_vo.bg;
        UIManager.getInstance().storyCon.addChild(new FightMainUI(vo));
    }
    
    public fightOver():void
    {
        UIManager.getInstance().storyCon.removeChildren();
        if(this.current_mission_vo != null && this.current_mission_vo.avg_over_id != 0){
            AVGLogic.getInstance().startAVG(this.current_mission_vo.avg_over_id,AVGLogic.OVER_AVG);
        }
    }
    
    private getSourceKeysByID(ids:string[]):string[]
    {
        var keys:string[] = [];
        
        return keys;
    }

}
