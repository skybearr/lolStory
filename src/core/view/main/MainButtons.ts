/**
 *
 * @author 
 *
 */
class MainButtons extends eui.Group{
	public constructor() {
    	super();
        this.touchThrough = true;
    	this.once(egret.Event.ADDED_TO_STAGE,this.onStage,this);
	}
	
    private txtUpArr: string[] = ["人机", "匹配", "排位", "瓦罗兰大赛"];
    private txtDownArr: string[] = ["属性", "背包", "布阵", "坐骑", "天赋"];
	private onStage(e:egret.Event):void
	{
    	
        for (var i: number = 0; i < this.txtDownArr.length;i++){
            var btn: BaseButton = new BaseButton("b6_png","b5_png",this.txtDownArr[i]);
            btn.x = (GlobalData.GameStage_width - 85 * (this.txtDownArr.length - i));
            btn.y = GlobalData.GameStage_height - 67;
            btn.name = i + "";
            this.addChild(btn);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
	    }
	}
	
	private click(e:TouchEvent):void
	{
        var btn: BaseButton = <any>e.currentTarget;
        var i: number = parseInt(btn.name);
        switch (i)
        {
            case 0:
                UIManager.getInstance().openSecondUI(new RoleUI());
                break;
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
        }
	}
}
