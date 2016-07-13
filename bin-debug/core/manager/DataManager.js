/**
 *
 * @author
 *
 */
var DataManager = (function (_super) {
    __extends(DataManager, _super);
    function DataManager() {
        _super.call(this);
    }
    var d = __define,c=DataManager,p=c.prototype;
    DataManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new DataManager();
        }
        return this.instance;
    };
    p.initJsonData = function () {
        RES.getResByUrl("String_json", this.stringDataComplete, this, RES.ResourceItem.TYPE_JSON);
    };
    p.getJsonData = function (src) {
        switch (src) {
            case "String_json":
                return this.string_data_arr;
        }
        return null;
    };
    p.stringDataComplete = function (e) {
        this.string_data_arr = e;
    };
    return DataManager;
}(egret.EventDispatcher));
egret.registerClass(DataManager,'DataManager');
