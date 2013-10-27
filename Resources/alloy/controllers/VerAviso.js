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
    $.__views.__alloyId38 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "30dp",
        id: "__alloyId38"
    });
    var __alloyId39 = [];
    __alloyId39.push($.__views.__alloyId38);
    $.__views.lblEncIzq = Ti.UI.createLabel({
        width: "50%",
        height: "10dp",
        top: "3dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "left",
        left: "16dp",
        id: "lblEncIzq"
    });
    $.__views.__alloyId38.add($.__views.lblEncIzq);
    $.__views.lblEncDcha = Ti.UI.createLabel({
        width: "50%",
        height: "10dp",
        top: "3dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "right",
        right: "16dp",
        id: "lblEncDcha"
    });
    $.__views.__alloyId38.add($.__views.lblEncDcha);
    $.__views.__alloyId40 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        id: "__alloyId40"
    });
    __alloyId39.push($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Asunto",
        id: "__alloyId41"
    });
    $.__views.__alloyId40.add($.__views.__alloyId41);
    $.__views.lblSubject = Ti.UI.createLabel({
        width: "100%",
        height: "40dp",
        textAlign: "left",
        left: "16dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue"
        },
        id: "lblSubject"
    });
    $.__views.__alloyId40.add($.__views.lblSubject);
    $.__views.__alloyId42 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "300dp",
        id: "__alloyId42"
    });
    __alloyId39.push($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Detalle",
        id: "__alloyId43"
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.txtContent = Ti.UI.createLabel({
        top: "15dp",
        width: "80%",
        height: "300dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        id: "txtContent"
    });
    $.__views.__alloyId42.add($.__views.txtContent);
    $.__views.Marco = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        backgroundImage: "backGround320x416Base.png",
        top: "0dp",
        data: __alloyId39,
        id: "Marco"
    });
    $.__views.winVerAviso.add($.__views.Marco);
    $.__views.Marco.footerView = void 0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var arg1 = arguments[0] || {};
    var data = [];
    data = arg1;
    var avisos = Alloy.Collections.Notificacion;
    avisos.fetch();
    var model = avisos.get(data.IdNotificacion);
    var datos = model.toJSON();
    $.lblEncIzq.text = "Profesor " + datos.Profesor;
    $.lblEncDcha.text = datos.Fecha;
    $.lblSubject.text = datos.Titulo;
    $.txtContent.text = datos.Texto;
    model.save({
        Leida: 1
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;