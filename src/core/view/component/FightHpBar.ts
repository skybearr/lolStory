/**
 *
 * @author 
 *
 */
class FightHpBar extends eui.Group{
    private hp:number;
    private max_hp:number;
    private grid: number;
    private max_grid:number;
    private rate:number = 50;
    private max_width:number = 40;
    
    private arr:FightHpBarItem[];
    private timer:egret.Timer;
    private reduce_grid:number;
    
	public constructor(hp:number,maxhp:number) {
        super();
        this.hp = hp;
        this.max_hp = maxhp;
        this.grid = Math.ceil(this.hp / this.rate);
        this.max_grid = Math.ceil(this.max_hp / this.rate);
        this.once(egret.Event.ADDED_TO_STAGE,this.onStage,this);
	}
	
	private onStage():void
	{
    	  this.arr = [];
	    for(var i:number=0;i<this.max_grid;i++){
            var item:FightHpBarItem = new FightHpBarItem(i);
            item.x = 12 * (i % (this.max_width/2)); 
            item.y = 35 * (Math.floor(i / (this.max_width/2)) % 2);
            this.addChild(item);
            this.arr.push(item);
	    }
	    
	    this.timer = new egret.Timer(20);
	    this.timer.addEventListener(egret.TimerEvent.TIMER,this.change,this);
	    this.once(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
	}
	
	public setHP(n:number):void
	{
        this.reduce_grid = Math.ceil(n / this.rate);
        this.timer.repeatCount = this.grid - this.reduce_grid > 0 ? this.grid - this.reduce_grid : this.grid;
        this.timer.start();
	}
	
	private change():void
	{
        if(this.arr.length > 0) {
            this.arr[this.arr.length - 1].clear();
            this.arr.pop();
        }
	}
	
	private clear():void
	{
	    this.timer.stop();
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.change,this);
        this.arr = null;
	}
}
