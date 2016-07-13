/**
 *
 * @author 
 *
 */
class FightLogic extends egret.EventDispatcher{
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
    
    public startFight(mission_id:number)
    {
        
    }
}
