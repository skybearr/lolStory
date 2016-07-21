/**
 *
 * @author 
 *
 */
class MyUIEvent extends egret.Event{
    public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
    }
	
    public data:any = null;
    /**登录*/
    public static LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
    
    public static OPEN_MISSION_LIST: string = "OPEN_MISSION_LIST";
    
    /**战斗胜利以后刷新小关卡状态*/
    public static UPDATE_MISSION_ITEM: string = "UPDATE_MISSION_ITEM";
    
    /**加载剧情&战斗资源*/
    public static LOAD_FIGHT_AND_AVG_SOURCE: string = "LOAD_FIGHT_AND_AVG_SOURCE";
}
