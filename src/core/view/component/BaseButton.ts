/**
 *
 * @author 
 *
 */
class BaseButton extends eui.Group
{
    private src_str: string;
    private src_str_down: string;
    private txt_str: string;

    private txt: eui.Label;
    private src: eui.Image;
    public constructor(srcstr_normal: string, srcstr_down: string, txt: string = "")
    {
        super();
        this.src_str = srcstr_normal;
        this.src_str_down = srcstr_down;
        this.txt_str = txt;
    }

    protected childrenCreated()
    {
        super.childrenCreated();
        var img: egret.Texture = RES.getRes(this.src_str);
        this.src = new eui.Image(img);
        this.addChild(this.src);

        if (this.txt_str != null)
        {
            this.txt = new eui.Label();
            this.txt.text = this.txt_str;
            this.txt.verticalCenter = 0;
            this.txt.horizontalCenter = 0;
            this.txt.size = 26;
            this.txt.filters = FilterUtil.getTxtFilter();
            this.txt.textColor = 0xff00cc;
            this.txt.fontFamily = "Adobe 楷体 Std R";
            this.txt.textAlign = egret.HorizontalAlign.CENTER;
            this.addChild(this.txt);
        }

        if (this.src_str != this.src_str_down)
        {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
        }

        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    }

    protected begin(): void
    {
        this.src.texture = RES.getRes(this.src_str_down);
    }
    protected end(): void
    {
        this.src.texture = RES.getRes(this.src_str);
    }

    public startTween(): void
    {
        var oldY: number = this.y;
        var tw = egret.Tween.get(this, { loop: true });
        tw.to({ y: this.y + 20 }, 500)
            .to({ y: oldY }, 500).wait(100);
    }

    public clear(): void
    {
        if (this.src_str != this.src_str_down)
        {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
        }
        egret.Tween.removeTweens(this);
        this.removeChildren();
        this.src_str = null;
        this.src_str_down = null;
        this.txt = null;
        this.txt_str = null;
        this.src = null;
    }
}
