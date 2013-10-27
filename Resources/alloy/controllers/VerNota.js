function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "VerNota";
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
    $.__views.__alloyId45 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "30dp",
        id: "__alloyId45"
    });
    var __alloyId46 = [];
    __alloyId46.push($.__views.__alloyId45);
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
    $.__views.__alloyId45.add($.__views.lblEncIzq);
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
    $.__views.__alloyId45.add($.__views.lblEncDcha);
    $.__views.__alloyId47 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        id: "__alloyId47"
    });
    __alloyId46.push($.__views.__alloyId47);
    $.__views.lblCalificacion = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        id: "lblCalificacion"
    });
    $.__views.__alloyId47.add($.__views.lblCalificacion);
    $.__views.lblNota = Ti.UI.createLabel({
        width: "100%",
        height: "40dp",
        textAlign: "left",
        left: "16dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue"
        },
        id: "lblNota"
    });
    $.__views.__alloyId47.add($.__views.lblNota);
    $.__views.__alloyId48 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        id: "__alloyId48"
    });
    __alloyId46.push($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createLabel({
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
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
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
    $.__views.__alloyId48.add($.__views.lblSubject);
    $.__views.__alloyId50 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "300dp",
        id: "__alloyId50"
    });
    __alloyId46.push($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Cuerpo",
        id: "__alloyId51"
    });
    $.__views.__alloyId50.add($.__views.__alloyId51);
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
    $.__views.__alloyId50.add($.__views.txtContent);
    $.__views.Marco = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        backgroundImage: "backGround320x416Base.png",
        top: "0dp",
        data: __alloyId46,
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
    $.lblCalificacion.text = "Calificación " + datos.Asignatura;
    $.lblNota.text = datos.Nota;
    model.save({
        Leida: 1
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;