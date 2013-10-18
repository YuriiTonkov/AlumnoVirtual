function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "WinOpciones";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.WinOpciones = Ti.UI.createWindow({
        barColor: "#e7effa",
        translucent: "false",
        backgroundColor: "EEE",
        id: "WinOpciones"
    });
    $.__views.WinOpciones && $.addTopLevelView($.__views.WinOpciones);
    $.__views.rowNotas = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        id: "rowNotas"
    });
    var __alloyId35 = [];
    __alloyId35.push($.__views.rowNotas);
    $.__views.__alloyId36 = Ti.UI.createLabel({
        width: "100%",
        height: "40dp",
        textAlign: "left",
        left: "10dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Notas",
        id: "__alloyId36"
    });
    $.__views.rowNotas.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createLabel({
        width: "100%",
        height: "10dp",
        top: "33dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "left",
        left: "10dp",
        text: "Notas entregadas por el profesor",
        id: "__alloyId37"
    });
    $.__views.rowNotas.add($.__views.__alloyId37);
    $.__views.rowAvisos = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        id: "rowAvisos"
    });
    __alloyId35.push($.__views.rowAvisos);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        width: "100%",
        height: "40dp",
        textAlign: "left",
        left: "10dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Avisos",
        id: "__alloyId38"
    });
    $.__views.rowAvisos.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createLabel({
        width: "100%",
        height: "10dp",
        top: "33dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "left",
        left: "10dp",
        text: "Avisos del profesor",
        id: "__alloyId39"
    });
    $.__views.rowAvisos.add($.__views.__alloyId39);
    $.__views.rowApuntes = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        id: "rowApuntes"
    });
    __alloyId35.push($.__views.rowApuntes);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        width: "100%",
        height: "40dp",
        textAlign: "left",
        left: "10dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Apuntes",
        id: "__alloyId40"
    });
    $.__views.rowApuntes.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createLabel({
        width: "100%",
        height: "10dp",
        top: "33dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "left",
        left: "10dp",
        text: "Enlaces a apuntes de asignaturas",
        id: "__alloyId41"
    });
    $.__views.rowApuntes.add($.__views.__alloyId41);
    $.__views.Marco = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        data: __alloyId35,
        top: "10%",
        id: "Marco"
    });
    $.__views.WinOpciones.add($.__views.Marco);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var arg1 = arguments[0] || {};
    var data = [];
    data = arg1;
    $.WinOpciones.title = data.Nombre;
    var alumno = Alloy.Collections.Alumno;
    var model = alumno.get(data.IdAlumno);
    var datos = model.toJSON();
    true == datos.UsuarioCloud && Cloud.Users.login({
        login: datos.Email,
        password: "AlumnoVirtual"
    }, function(e) {
        e.success ? Ti.API.info("Logged in user, id = " + e.users[0].id + ", session ID = " + Cloud.sessionId) : Ti.API.info("Login failed.");
    });
    $.rowAvisos.addEventListener("click", function() {
        var tabOpcionesController = Alloy.createController("WinAvisos", {});
        Alloy.Globals.GrupoTab.activeTab.open(tabOpcionesController.getView());
    });
    $.WinOpciones.addEventListener("close", function() {
        Cloud.Users.logout(function(e) {
            e.success || alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;