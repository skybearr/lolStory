/**
 *
 * @author 
 *
 */
class DataManager extends egret.EventDispatcher {
    public constructor() {
        super();
    }

    private static instance: DataManager;
    public static getInstance(): DataManager {
        if(this.instance == null) {
            this.instance = new DataManager();
        }
        return this.instance;
    }
    
    private string_data_arr:Object[];
    
    public initJsonData():void
    {
        this.string_data_arr = RES.getRes("String_json");
        StoryLogic.getInstance().initData();
    }
    
    /**检测用户名*/
    public checkUserName(str:string):boolean
    {
        if(str == "" || str == null)
        {
            UIManager.getInstance().popMessage("用户名不能为空");
            return false;
        }
        else if(str.length > 16)
        {
            UIManager.getInstance().popMessage("不能超过8个汉字或16个字符");
            return false;
        }
        else if(this.checkSenseriousWords(str)) {
            UIManager.getInstance().popMessage("包含敏感字");
            return false;
        }
        
        return true;
    }
    
    /**检测敏感字*/
    public checkSenseriousWords(str:string):boolean
    {
        return false;
    }
}
