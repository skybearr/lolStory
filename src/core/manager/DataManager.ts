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
        RES.getResByUrl("String_json",this.stringDataComplete,this,RES.ResourceItem.TYPE_JSON);
    }
    
    public getJsonData(src:string):any
    {
        switch(src){
            case "String_json":
                return this.string_data_arr;
        }
        return null;
    }
    
    private stringDataComplete(e:any):void
    {
        this.string_data_arr = e;
    }

}
