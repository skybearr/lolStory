/**
 *
 * @author 
 *
 */
class LoadingInGameUI extends eui.Component{
	public constructor() {
    	super();
        this.skinName = "LoadingInGameSkin";
	}
	
    private txt: eui.Label;
    private bar: BaseProgressBar;
	
    protected childrenCreated() {
        super.childrenCreated();
        this.bar.setBarMinMax(50,338);
        this.reset();
    }

    public reset(): void {
        this.txt.text = "";
        this.bar.reset();
    }

    public setText(str): void {
        this.txt = str;
    }

    public setProgress(current,total): void {
        this.bar.setProgress(current,total);
        this.txt.text = "资源加载中..." + current + "/" + total;
    }

    public clear(): void {
        this.reset();
    }
}
