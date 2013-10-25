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
        backgroundColor: "e2effa",
        id: "WinOpciones"
    });
    $.__views.WinOpciones && $.addTopLevelView($.__views.WinOpciones);
    $.__views.rowNotas = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        id: "rowNotas"
    });
    var __alloyId46 = [];
    __alloyId46.push($.__views.rowNotas);
    $.__views.__alloyId47 = Ti.UI.createLabel({
        width: "100%",
        height: "40dp",
        textAlign: "left",
        left: "16dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue"
        },
        text: "Notas",
        id: "__alloyId47"
    });
    $.__views.rowNotas.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createLabel({
        width: "100%",
        height: "10dp",
        top: "35dp",
        font: {
            fontSize: 12,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "left",
        left: "16dp",
        text: "Notas de los examenes realizados",
        id: "__alloyId48"
    });
    $.__views.rowNotas.add($.__views.__alloyId48);
    $.__views.numNotas = Ti.UI.createLabel({
        width: "10%",
        height: "10dp",
        top: "26dp",
        font: {
            fontSize: 14,
            fontFamily: "HelveticaNeue"
        },
        textAlign: "right",
        right: "16dp",
        id: "numNotas"
    });
    $.__views.rowNotas.add($.__views.numNotas);
    $.__views.rowAvisos = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        id: "rowAvisos"
    });
    __alloyId46.push($.__views.rowAvisos);
    $.__views.__alloyId49 = Ti.UI.createLabel({
        width: "100%",
        height: "40dp",
        textAlign: "left",
        left: "16dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue"
        },
        text: "Avisos",
        id: "__alloyId49"
    });
    $.__views.rowAvisos.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel({
        width: "100%",
        height: "10dp",
        top: "35dp",
        font: {
            fontSize: 12,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "left",
        left: "16dp",
        text: "Avisos del profesor",
        id: "__alloyId50"
    });
    $.__views.rowAvisos.add($.__views.__alloyId50);
    $.__views.numAvisos = Ti.UI.createLabel({
        width: "10%",
        height: "10dp",
        top: "26dp",
        font: {
            fontSize: 14,
            fontFamily: "HelveticaNeue"
        },
        textAlign: "right",
        right: "16dp",
        id: "numAvisos"
    });
    $.__views.rowAvisos.add($.__views.numAvisos);
    $.__views.rowApuntes = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        id: "rowApuntes"
    });
    __alloyId46.push($.__views.rowApuntes);
    $.__views.__alloyId51 = Ti.UI.createLabel({
        width: "100%",
        height: "40dp",
        textAlign: "left",
        left: "16dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue"
        },
        text: "Apuntes",
        id: "__alloyId51"
    });
    $.__views.rowApuntes.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createLabel({
        width: "100%",
        height: "10dp",
        top: "35dp",
        font: {
            fontSize: 12,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "left",
        left: "16dp",
        text: "Apuntes facilitados",
        id: "__alloyId52"
    });
    $.__views.rowApuntes.add($.__views.__alloyId52);
    $.__views.numApuntes = Ti.UI.createLabel({
        width: "10%",
        height: "10dp",
        top: "26dp",
        font: {
            fontSize: 14,
            fontFamily: "HelveticaNeue"
        },
        textAlign: "right",
        right: "16dp",
        id: "numApuntes"
    });
    $.__views.rowApuntes.add($.__views.numApuntes);
    $.__views.Marco = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        backgroundImage: "backGround320x416Base.png",
        top: "0dp",
        data: __alloyId46,
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
        if (e.success) {
            Ti.API.info("Logged in user, id = " + e.users[0].id + ", session ID = " + Cloud.sessionId);
            Cloud.Messages.showInbox(function(u) {
                if (u.success) if (0 == u.messages.length) {
                    alert("No hay mensajes");
                    var notificaciones = Alloy.Collections.Notificacion;
                    notificaciones.fetch();
                    var notas = notificaciones.where({
                        Alumno: datos.IdAlumno,
                        Tipo: 1,
                        Leida: 0
                    });
                    $.numNotas.text = notas.length;
                    var avisos = notificaciones.where({
                        Alumno: datos.IdAlumno,
                        Tipo: 2,
                        Leida: 0
                    });
                    $.numAvisos.text = avisos.length;
                    var apuntes = notificaciones.where({
                        Alumno: datos.IdAlumno,
                        Tipo: 3,
                        Leida: 0
                    });
                    $.numApuntes.text = apuntes.length;
                } else {
                    var data = [];
                    for (var i = 0, l = u.messages.length; l > i; i++) {
                        var mensaje = u.messages[i];
                        var model = Alloy.createModel("Notificacion", {
                            Tipo: mensaje.custom_fields.IdTipo,
                            Titulo: mensaje.subject,
                            Texto: mensaje.body,
                            Alumno: data.IdAlumno,
                            Asignatura: mensaje.custom_fields.Asignatura,
                            Nota: mensaje.custom_fields.Nota,
                            Leida: false
                        });
                        var notificaciones = Alloy.Collections.Notificacion;
                        notificaciones.add(model);
                        model.save();
                        notificaciones.fetch();
                        var notas = notificaciones.where({
                            Alumno: datos.IdAlumno,
                            Tipo: 1,
                            Leida: 0
                        });
                        $.numNotas.text = notas.length;
                        var avisos = notificaciones.where({
                            Alumno: datos.IdAlumno,
                            Tipo: 2,
                            Leida: 0
                        });
                        $.numAvisos.text = avisos.length;
                        var apuntes = notificaciones.where({
                            Alumno: datos.IdAlumno,
                            Tipo: 3,
                            Leida: 0
                        });
                        $.numApuntes.text = apuntes.length;
                        Cloud.Messages.remove({
                            message_id: mensaje.id
                        }, function(e) {
                            e.success || alert("No se ha actualizado la información online" + e.message);
                        });
                    }
                } else alert("Error de sincronizacion" + u.message);
            });
        } else alert("Login failed.");
    });
    $.rowNotas.addEventListener("click", function() {
        var tab = Alloy.createController("WinListado", {
            alumno: datos.IdAlumno,
            item: 1
        });
        Alloy.Globals.GrupoTab.activeTab.open(tab.getView());
    });
    $.rowAvisos.addEventListener("click", function() {
        var tab = Alloy.createController("WinListado", {
            alumno: datos.IdAlumno,
            item: 2
        });
        Alloy.Globals.GrupoTab.activeTab.open(tab.getView());
    });
    $.rowApuntes.addEventListener("click", function() {
        var tab = Alloy.createController("WinListado", {
            alumno: datos.IdAlumno,
            item: 3
        });
        Alloy.Globals.GrupoTab.activeTab.open(tab.getView());
    });
    $.WinOpciones.addEventListener("close", function() {
        Cloud.Users.logout(function(e) {
            e.success ? $.destroy() : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;