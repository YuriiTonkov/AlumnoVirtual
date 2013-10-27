function Controller() {
    function __alloyId57() {
        __alloyId57.opts || {};
        var models = __alloyId56.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId54 = models[i];
            __alloyId54.__transform = nombrecompleto(__alloyId54);
            var __alloyId55 = Alloy.createController("AlumnoRow", {
                $model: __alloyId54
            });
            rows.push(__alloyId55.getViewEx({
                recurse: true
            }));
        }
        $.__views.TablaAlumnos.setData(rows);
    }
    function nombrecompleto(model) {
        var transform = model.toJSON();
        transform.nombrecompleto = transform.Nombre + " " + transform.Apellido1 + " " + transform.Apellido2;
        return transform;
    }
    function NuevoAlumno() {
        var tabAlumnosController = Alloy.createController("Alumno", {});
        Alloy.Globals.GrupoTab.activeTab.open(tabAlumnosController.getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "WinAlumnos";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.WinAlumnos = Ti.UI.createWindow({
        barColor: "#e7effa",
        translucent: "false",
        backgroundColor: "e2effa",
        id: "WinAlumnos",
        title: "Alumnos"
    });
    $.__views.WinAlumnos && $.addTopLevelView($.__views.WinAlumnos);
    $.__views.TablaAlumnos = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        backgroundImage: "backGround320x416Base.png",
        top: "0dp",
        id: "TablaAlumnos"
    });
    $.__views.WinAlumnos.add($.__views.TablaAlumnos);
    var __alloyId56 = Alloy.Collections["Alumno"] || Alumno;
    __alloyId56.on("fetch destroy change add remove reset", __alloyId57);
    $.__views.addAlumno = Ti.UI.createButton({
        id: "addAlumno",
        title: "Nuevo alumno",
        top: "-50dp"
    });
    $.__views.WinAlumnos.add($.__views.addAlumno);
    NuevoAlumno ? $.__views.addAlumno.addEventListener("click", NuevoAlumno) : __defers["$.__views.addAlumno!click!NuevoAlumno"] = true;
    exports.destroy = function() {
        __alloyId56.off("fetch destroy change add remove reset", __alloyId57);
    };
    _.extend($, $.__views);
    $.WinAlumnos.title = "Alumnos";
    $.WinAlumnos.setRightNavButton($.addAlumno);
    var alumnos = Alloy.Collections.Alumno;
    alumnos.fetch();
    $.TablaAlumnos.addEventListener("delete", function(e) {
        var alumnos = Alloy.Collections.Alumno;
        var model = alumnos.get(e.rowData.data);
        model.destroy();
        alumnos.remove(model);
        alumnos.fetch();
    });
    $.WinAlumnos.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.addAlumno!click!NuevoAlumno"] && $.__views.addAlumno.addEventListener("click", NuevoAlumno);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;