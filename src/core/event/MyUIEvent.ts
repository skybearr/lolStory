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
    
}
