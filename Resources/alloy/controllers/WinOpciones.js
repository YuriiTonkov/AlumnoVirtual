function Controller() {
    function __alloyId45() {
        __alloyId45.opts || {};
        var models = __alloyId44.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId42 = models[i];
            __alloyId42.__transform = {};
            var __alloyId43 = Alloy.createController("OpcionRow", {
                $model: __alloyId42
            });
            rows.push(__alloyId43.getViewEx({
                recurse: true
            }));
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
    var __alloyId44 = Alloy.Collections["TipoNotificacion"] || TipoNotificacion;
    __alloyId44.on("fetch destroy change add remove reset", __alloyId45);
    exports.destroy = function() {
        __alloyId44.off("fetch destroy change add remove reset", __alloyId45);
    };
    _.extend($, $.__views);
    var arg1 = arguments[0] || {};
    var data = [];
    data = arg1;
    $.WinOpciones.title = data.Nombre;
    var alumno = Alloy.Collections.Alumno;
    var model = alumno.get(data.IdAlumno);
    var datos = model.toJSON();
    var opcion = Alloy.Collections.TipoNotificacion;
    opcion.fetch();
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
                        var message = u.messages[i];
                        Cloud.Messages.show({
                            message_id: message.id
                        }, function(p) {
                            if (p.success) {
                                var mensaje = p.messages[0];
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
                            } else alert("Error de sincronizacion" + p.message);
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