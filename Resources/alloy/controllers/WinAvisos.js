function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "WinAvisos";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.WinAvisos = Ti.UI.createWindow({
        barColor: "#e7effa",
        translucent: "false",
        backgroundColor: "e2effa",
        id: "WinAvisos"
    });
    $.__views.WinAvisos && $.addTopLevelView($.__views.WinAvisos);
    $.__views.TabAvisos = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        backgroundImage: "backGround320x416Base.png",
        top: "0dp",
        id: "TabAvisos"
    });
    $.__views.WinAvisos.add($.__views.TabAvisos);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Cloud.Messages.showInbox(function(e) {
        if (e.success) if (0 == e.messages.length) $.TabAvisos.setData([ {
            title: "No hay mensajes"
        } ]); else {
            var data = [];
            for (var i = 0, l = e.messages.length; l > i; i++) {
                var message = e.messages[i];
                var row = Ti.UI.createTableViewRow({
                    id: message.id,
                    title: message.subject
                });
                row.addEventListener("click", function() {
                    var tabAsignaturasController = Alloy.createController("VerAviso", {
                        IdAviso: message.id
                    });
                    Alloy.Globals.GrupoTab.activeTab.open(tabAsignaturasController.getView());
                });
                data.push(row);
            }
            $.TabAvisos.setData(data);
        } else $.TabAvisos.setData([ {
            title: e.error && e.message || e
        } ]);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;