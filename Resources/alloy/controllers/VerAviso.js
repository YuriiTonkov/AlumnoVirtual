function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "VerAviso";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.winVerAviso = Ti.UI.createWindow({
        barColor: "#e7effa",
        translucent: "false",
        backgroundColor: "e2effa",
        id: "winVerAviso"
    });
    $.__views.winVerAviso && $.addTopLevelView($.__views.winVerAviso);
    $.__views.__alloyId30 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId30"
    });
    var __alloyId31 = [];
    __alloyId31.push($.__views.__alloyId30);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "6dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Asunto",
        id: "__alloyId32"
    });
    $.__views.__alloyId30.add($.__views.__alloyId32);
    $.__views.txtSubject = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtSubject"
    });
    $.__views.__alloyId30.add($.__views.txtSubject);
    $.__views.__alloyId33 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "100dp",
        id: "__alloyId33"
    });
    __alloyId31.push($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "6dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Cuerpo",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.txtContent = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtContent"
    });
    $.__views.__alloyId33.add($.__views.txtContent);
    $.__views.Marco = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        backgroundImage: "backGround320x416Base.png",
        top: "0dp",
        data: __alloyId31,
        id: "Marco"
    });
    $.__views.Marco && $.addTopLevelView($.__views.Marco);
    $.__views.__alloyId35 = Ti.UI.createWindow({
        barColor: "#e7effa",
        translucent: "false",
        backgroundColor: "e2effa",
        id: "__alloyId35"
    });
    $.__views.__alloyId35 && $.addTopLevelView($.__views.__alloyId35);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var arg1 = arguments[0] || {};
    var data = [];
    data = arg1;
    Cloud.Messages.show({
        message_id: data.IdAviso
    }, function(e) {
        if (e.success) {
            $.txtSubject.value = e.messages[0].subject;
            $.txtContent.value = e.messages[0].body;
        } else alert(e.message);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;