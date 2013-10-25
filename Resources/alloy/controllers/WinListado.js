function Controller() {
    function __alloyId45() {
        __alloyId45.opts || {};
        var models = Filtrado(__alloyId44);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId42 = models[i];
            __alloyId42.__transform = Transform(__alloyId42);
            var __alloyId43 = Alloy.createController("ItemRow", {
                $model: __alloyId42
            });
            rows.push(__alloyId43.getViewEx({
                recurse: true
            }));
        }
        $.__views.TablaItems.setData(rows);
    }
    function Transform(model) {
        var transform = model.toJSON();
        switch (data.item) {
          case 1:
            transform.Subtitulo = transform.Texto.substring(0, 50).concat("...");
            break;

          case 2:
            break;

          case 3:        }
        return transform;
    }
    function Filtrado(collection) {
        var coleccion_filtrada = collection.where({
            Tipo: data.item,
            Alumno: data.alumno
        });
        return coleccion_filtrada;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "WinListado";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.WinListado = Ti.UI.createWindow({
        barColor: "#e7effa",
        translucent: "false",
        backgroundColor: "e2effa",
        id: "WinListado",
        title: ""
    });
    $.__views.WinListado && $.addTopLevelView($.__views.WinListado);
    $.__views.TablaItems = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        backgroundImage: "backGround320x416Base.png",
        top: "0dp",
        id: "TablaItems"
    });
    $.__views.WinListado.add($.__views.TablaItems);
    var __alloyId44 = Alloy.Collections["Notificacion"] || Notificacion;
    __alloyId44.on("fetch destroy change add remove reset", __alloyId45);
    exports.destroy = function() {
        __alloyId44.off("fetch destroy change add remove reset", __alloyId45);
    };
    _.extend($, $.__views);
    var arg1 = arguments[0] || {};
    var data = [];
    data = arg1;
    var listado = Alloy.Collections.Notificacion;
    listado.fetch();
    switch (data.item) {
      case 1:
        $.WinListado.title = "Notas";
        break;

      case 2:
        $.WinListado.title = "Avisos";
        break;

      case 3:
        $.WinListado.title = "Apuntes";
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;