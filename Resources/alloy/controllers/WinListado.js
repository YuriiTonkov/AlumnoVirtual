function Controller() {
    function __alloyId62() {
        __alloyId62.opts || {};
        var models = Filtrado(__alloyId61);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId59 = models[i];
            __alloyId59.__transform = Transform(__alloyId59);
            var __alloyId60 = Alloy.createController("ItemRow", {
                $model: __alloyId59
            });
            rows.push(__alloyId60.getViewEx({
                recurse: true
            }));
        }
        $.__views.TablaItems.setData(rows);
    }
    function Transform(model) {
        var transform = model.toJSON();
        transform.Subtitulo = transform.Texto.substring(0, 50).concat("...");
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
    var __alloyId61 = Alloy.Collections["Notificacion"] || Notificacion;
    __alloyId61.on("fetch destroy change add remove reset", __alloyId62);
    exports.destroy = function() {
        __alloyId61.off("fetch destroy change add remove reset", __alloyId62);
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
    $.TablaItems.addEventListener("click", function(e) {
        if ("tblItemRow" == e.source.id) {
            var tabItemController = Alloy.createController("VerNota", {
                IdNotificacion: e.source.data
            });
            Alloy.Globals.GrupoTab.activeTab.open(tabItemController.getView());
        } else {
            var tabItemController = Alloy.createController("VerNota", {
                IdNotificacion: e.source.textid
            });
            Alloy.Globals.GrupoTab.activeTab.open(tabItemController.getView());
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;