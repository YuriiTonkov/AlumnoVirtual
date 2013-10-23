function Controller() {
    function __alloyId64() {
        __alloyId64.opts || {};
        var models = __alloyId63.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId42 = models[i];
            __alloyId42.__transform = {};
            var __alloyId43 = Ti.UI.createTableViewRow({
                backgroundColor: "white",
                height: "40dp"
            });
            rows.push(__alloyId43);
            var __alloyId45 = Ti.UI.createLabel({
                width: "100%",
                height: "40dp",
                textAlign: "left",
                left: "16dp",
                font: {
                    fontSize: 16,
                    fontFamily: "HelveticaNeue-UltraLight"
                },
                text: "Notas"
            });
            __alloyId43.add(__alloyId45);
            var __alloyId47 = Ti.UI.createLabel({
                width: "100%",
                height: "10dp",
                top: "26dp",
                font: {
                    fontSize: 12,
                    fontFamily: "HelveticaNeue-UltraLight"
                },
                textAlign: "left",
                left: "16dp",
                text: "Notas de los examenes realizados"
            });
            __alloyId43.add(__alloyId47);
            var __alloyId48 = Ti.UI.createLabel({
                width: "10%",
                height: "10dp",
                top: "26dp",
                font: {
                    fontSize: 12,
                    fontFamily: "HelveticaNeue-UltraLight"
                },
                textAlign: "right",
                right: "16dp"
            });
            __alloyId43.add(__alloyId48);
            var __alloyId50 = Ti.UI.createTableViewRow({
                backgroundColor: "white",
                height: "40dp"
            });
            rows.push(__alloyId50);
            var __alloyId52 = Ti.UI.createLabel({
                width: "100%",
                height: "40dp",
                textAlign: "left",
                left: "16dp",
                font: {
                    fontSize: 16,
                    fontFamily: "HelveticaNeue-UltraLight"
                },
                text: "Avisos"
            });
            __alloyId50.add(__alloyId52);
            var __alloyId54 = Ti.UI.createLabel({
                width: "100%",
                height: "10dp",
                top: "26dp",
                font: {
                    fontSize: 12,
                    fontFamily: "HelveticaNeue-UltraLight"
                },
                textAlign: "left",
                left: "16dp",
                text: "Avisos del profesor"
            });
            __alloyId50.add(__alloyId54);
            var __alloyId55 = Ti.UI.createLabel({
                width: "10%",
                height: "10dp",
                top: "26dp",
                font: {
                    fontSize: 12,
                    fontFamily: "HelveticaNeue-UltraLight"
                },
                textAlign: "right",
                right: "16dp"
            });
            __alloyId50.add(__alloyId55);
            var __alloyId57 = Ti.UI.createTableViewRow({
                backgroundColor: "white",
                height: "40dp"
            });
            rows.push(__alloyId57);
            var __alloyId59 = Ti.UI.createLabel({
                width: "100%",
                height: "40dp",
                textAlign: "left",
                left: "16dp",
                font: {
                    fontSize: 16,
                    fontFamily: "HelveticaNeue-UltraLight"
                },
                text: "Apuntes"
            });
            __alloyId57.add(__alloyId59);
            var __alloyId61 = Ti.UI.createLabel({
                width: "100%",
                height: "10dp",
                top: "26dp",
                font: {
                    fontSize: 12,
                    fontFamily: "HelveticaNeue-UltraLight"
                },
                textAlign: "left",
                left: "16dp",
                text: "Apuntes facilitados"
            });
            __alloyId57.add(__alloyId61);
            var __alloyId62 = Ti.UI.createLabel({
                width: "10%",
                height: "10dp",
                top: "26dp",
                font: {
                    fontSize: 12,
                    fontFamily: "HelveticaNeue-UltraLight"
                },
                textAlign: "right",
                right: "16dp"
            });
            __alloyId57.add(__alloyId62);
        }
        $.__views.Marco.setData(rows);
    }
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
    $.__views.Marco = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        backgroundImage: "backGround320x416Base.png",
        top: "0dp",
        id: "Marco"
    });
    $.__views.WinOpciones.add($.__views.Marco);
    var __alloyId63 = Alloy.Collections["TipoNotificacion"] || TipoNotificacion;
    __alloyId63.on("fetch destroy change add remove reset", __alloyId64);
    exports.destroy = function() {
        __alloyId63.off("fetch destroy change add remove reset", __alloyId64);
    };
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
                if (u.success) if (0 == u.messages.length) alert("No hay mensajes"); else {
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
                        var Notificaciones = Alloy.Collections.Notificacion;
                        Notificaciones.add(model);
                        model.save();
                        Notificaciones.fetch();
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
    $.WinOpciones.addEventListener("close", function() {
        Cloud.Users.logout(function(e) {
            e.success ? $.destroy() : alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;