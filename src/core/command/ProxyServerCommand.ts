/**
 *
 * @author 
 * 模拟服务器
 */
class ProxyServerCommand extends egret.EventDispatcher{
	public constructor() {
    	super();
	}
	
    private static instance: ProxyServerCommand;
    public static getInstance(): ProxyServerCommand {
        if(this.instance == null) {
            this.instance = new ProxyServerCommand();
        }
        return this.instance;
    }
}
