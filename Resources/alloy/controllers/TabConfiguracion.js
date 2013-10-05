function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "TabConfiguracion";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId14 = Alloy.createController("WinAlumnos", {
        id: "__alloyId14"
    });
    $.__views.TabConfiguracion = Ti.UI.createTab({
        window: $.__views.__alloyId14.getViewEx({
            recurse: true
        }),
        title: "Configuracion",
        icon: "KS_nav_Config.png",
        id: "TabConfiguracion"
    });
    $.__views.TabConfiguracion && $.addTopLevelView($.__views.TabConfiguracion);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;