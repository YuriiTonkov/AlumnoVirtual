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
        backgroundColor: "EEE",
        id: "WinAvisos"
    });
    $.__views.WinAvisos && $.addTopLevelView($.__views.WinAvisos);
    $.__views.TabAvisos = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        id: "TabAvisos"
    });
    $.__views.WinAvisos.add($.__views.TabAvisos);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var table = $.TabAvisos;
    Cloud.Messages.showInbox(function(e) {
        if (e.success) if (0 == e.messages.length) table.setData([ {
            title: "No hay mensajes"
        } ]); else {
            var data = [];
            for (var i = 0, l = e.messages.length; l > i; i++) {
                var message = e.messages[i];
                var row = Ti.UI.createTableViewRow({
                    title: message.subject,
                    id: message.id
                });
                data.push(row);
            }
            table.setData(data);
        } else table.setData([ {
            title: e.error && e.message || e
        } ]);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;