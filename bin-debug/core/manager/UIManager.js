/**
 *
 * @author
 *
 */
var UIManager = (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        _super.call(this);
        this.ui_class_arr = null;
        /**二级界面的缓动大类型（退出时需要用）*/
        this.second_tween_type = 0;
        /**二级界面的缓动小类型（退出时需要用）*/
        this.second_tween_sub_type = 0;
    }
    var d = __define,c=UIManager,p=c.prototype;
    UIManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new UIManager();
        }
        return this.instance;
    };
    p.startLogin = function () {
        this.initUIClass();
        this.mainCon = new egret.DisplayObjectContainer();
        this.secondCon = new egret.DisplayObjectContainer();
        this.broadcastCon = new egret.DisplayObjectContainer();
        this.storyCon = new egret.DisplayObjectContainer();
        this.loadingCon = new egret.DisplayObjectContainer();
        if (GlobalData.GameStage != null) {
            GlobalData.GameStage.addChild(this.mainCon);
            GlobalData.GameStage.addChild(this.broadcastCon);
            GlobalData.GameStage.addChild(this.storyCon);
            GlobalData.GameStage.addChild(this.secondCon);
            GlobalData.GameStage.addChild(this.loadingCon);
            this.openFirstUI(UIManager.CLASS_UI_INDEX_LOGOANIMATION);
        }
    };
    p.startGame = function () {
        DataManager.getInstance().initJsonData();
        this.openFirstUI(UIManager.CLASS_UI_INDEX_MAIN);
    };
    p.initUIClass = function () {
        this.ui_class_arr = [LogoAnimation, LoginMain, MainUI, StoryUI];
    };
    /**开始剧情*/
    p.startAVG = function (mission_id) {
        AVGLogic.getInstance().startAVG(mission_id);
    };
    /**开始战斗流程，第一步，判断是否需要显示剧情*/
    p.startFight = function (mission_id) {
        //判断是否需要播放剧情
        if (this.needAvg()) {
            this.startAVG(mission_id);
        }
        else {
            FightLogic.getInstance().startFight(mission_id);
        }
    };
    p.needAvg = function () {
        return true;
    };
    /**打开一级界面
     * @param index 界面的索引
     * @param tweenType 界面进出的动画类型
     * */
    p.openFirstUI = function (index, tweenType) {
        if (tweenType === void 0) { tweenType = 0; }
        if (this.is_ui_tween) {
            console.log("正在打开界面，禁止操作");
            return;
        }
        this.is_ui_tween = true;
        //只接受一个一级界面存在，所以当大于一个的时候，先移除底下多余的
        while (this.mainCon.numChildren > 1) {
            this.mainCon.removeChildAt(0);
        }
        /**如果选择随机动画，则选择一种非0的类型*/
        if (tweenType == TweenManager.TWEEN_UI_RANDOM) {
            tweenType = Math.floor(Math.random() * 3) + 1;
        }
        console.log("缓动动画类型：" + tweenType);
        //如果第一次添加 没有其他界面，直接加上UI
        if (this.mainCon.numChildren == 0) {
            this.realOpenFirst(index, tweenType);
        }
        else {
            var extra = Math.ceil(Math.random() * 5);
            var last_ui = this.mainCon.getChildAt(0);
            TweenManager.getInstance().uiDisappearTween(last_ui, tweenType, extra, null, this);
            this.realOpenFirst(index, tweenType, extra);
        }
    };
    /**
     *
     * @param extra 二级tween的类型，需与消失一致*/
    p.realOpenFirst = function (index, type, extra) {
        if (extra === void 0) { extra = 0; }
        if (this.ui_class_arr[index] != null) {
            var ui = new this.ui_class_arr[index]();
            if (type == TweenManager.TWEEN_UI_NONE) {
                ui.x = GlobalData.GameStage_width / 2; //所有的baseFirst瞄点在中心
                ui.y = GlobalData.GameStage_height / 2;
                this.openFirstUIFinish();
            }
            else {
                this.openFirstUIFinish.bind(this);
                TweenManager.getInstance().uiAppearTween(ui, type, extra, this.openFirstUIFinish, this);
            }
            this.mainCon.addChild(ui);
        }
        else {
            console.log("ui索引错误");
        }
    };
    p.openFirstUIFinish = function () {
        //移除之前的UI
        while (this.mainCon.numChildren > 1) {
            this.mainCon.removeChildAt(0);
        }
        this.is_ui_tween = false;
    };
    /**关闭最上层的一级界面*/
    p.closeFirstUI = function () {
        while (this.mainCon.numChildren > 0) {
            this.mainCon.removeChildAt(this.mainCon.numChildren - 1);
        }
        this.is_ui_tween = false;
    };
    /**打开一个二级界面*/
    p.openSecondUI = function (ui, tweenType) {
        if (tweenType === void 0) { tweenType = 0; }
        if (this.is_ui_tween) {
            console.log("正在打开界面，禁止操作");
            return;
        }
        this.is_ui_tween = true;
        /**如果选择随机动画，则选择一种非0的类型*/
        if (tweenType == TweenManager.TWEEN_UI_RANDOM) {
            tweenType = Math.floor(Math.random() * 3) + 1;
        }
        this.second_tween_type = tweenType;
        this.second_tween_sub_type = Math.ceil(Math.random() * 5);
        if (ui != null) {
            if (tweenType == TweenManager.TWEEN_UI_NONE) {
                ui.x = GlobalData.GameStage_width / 2;
                ui.y = GlobalData.GameStage_height / 2;
                this.openSecondUIFinish();
            }
            else {
                this.openSecondUIFinish.bind(this);
                TweenManager.getInstance().uiAppearTween(ui, this.second_tween_type, this.second_tween_sub_type, this.openSecondUIFinish, this);
            }
            this.secondCon.addChild(ui);
        }
        else {
            console.log("二级界面不存在");
        }
    };
    p.openSecondUIFinish = function () {
        this.is_ui_tween = false;
    };
    p.closeSecondFinish = function (thisobj) {
        if (thisobj === void 0) { thisobj = this; }
        if (thisobj.secondCon.numChildren > 0) {
            thisobj.secondCon.removeChildAt(thisobj.secondCon.numChildren - 1);
        }
        this.is_ui_tween = false;
    };
    /**关闭当前最上层的二级界面*/
    p.closeSecondUI = function (closeImmediately) {
        if (closeImmediately === void 0) { closeImmediately = false; }
        if (this.is_ui_tween) {
            console.log("正在打开界面，禁止操作");
            return;
        }
        this.is_ui_tween = true;
        if (this.secondCon.numChildren > 0) {
            if (closeImmediately || this.second_tween_type == TweenManager.TWEEN_UI_NONE) {
                this.closeSecondFinish();
            }
            else {
                TweenManager.getInstance().uiSecondDisappearTween(this.secondCon.getChildAt(this.secondCon.numChildren - 1), this.second_tween_type, this.second_tween_sub_type, this.closeSecondFinish, this);
            }
        }
    };
    /**系统提示
     * @param str
     * @param type 类型 0悬浮提示  1弹出窗  2不再提示*/
    p.popMessage = function (str, type) {
        if (type === void 0) { type = 1; }
        console.log(str);
    };
    UIManager.CLASS_UI_INDEX_LOGOANIMATION = 0;
    UIManager.CLASS_UI_INDEX_LOGINMAIN = 1;
    UIManager.CLASS_UI_INDEX_MAIN = 2;
    UIManager.CLASS_UI_INDEX_STORY = 3;
    return UIManager;
}(egret.EventDispatcher));
egret.registerClass(UIManager,'UIManager');