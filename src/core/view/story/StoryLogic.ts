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
    
    /**章节中的关卡数据 x,y,width,最后一个是更多游戏按钮的位置*/
    public chapter_data = [[317,608,100,   412,579,100,    356,362,100,    412,265,100],
                            [493,352,220,   237,448,200,    451,613,220,    177,642,120],
                            [493,352,220,    237,448,200,    451,613,220,    177,642,120],
                            [493,352,220,    237,448,200,    451,613,220,    177,642,120]];
    
    /**当前已经打到的最新章节*/
    public current_chapterID: number = 1;
    /**当前已经打到的最新关卡*/
    public current_missionID: number = 2;
                           
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
