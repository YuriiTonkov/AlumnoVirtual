function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "OpcionRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tblOpcionRow = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        data: "undefined" != typeof $model.__transform["IdTipoNotificacion"] ? $model.__transform["IdTipoNotificacion"] : $model.get("IdTipoNotificacion"),
        id: "tblOpcionRow"
    });
    $.__views.tblOpcionRow && $.addTopLevelView($.__views.tblOpcionRow);
    $.__views.lblTitulo = Ti.UI.createLabel({
        width: "100%",
        height: "40dp",
        textAlign: "left",
        left: "16dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue"
        },
        id: "lblTitulo",
        text: "undefined" != typeof $model.__transform["Nombre"] ? $model.__transform["Nombre"] : $model.get("Nombre"),
        textid: "undefined" != typeof $model.__transform["IdTipoNotificacion"] ? $model.__transform["IdTipoNotificacion"] : $model.get("IdTipoNotificacion")
    });
    $.__views.tblOpcionRow.add($.__views.lblTitulo);
    $.__views.lblDescripcion = Ti.UI.createLabel({
        width: "100%",
        height: "10dp",
        top: "35dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "left",
        left: "16dp",
        id: "lblDescripcion",
        text: "undefined" != typeof $model.__transform["Descripcion"] ? $model.__transform["Descripcion"] : $model.get("Descripcion"),
        textid: "undefined" != typeof $model.__transform["IdTipoNotificacion"] ? $model.__transform["IdTipoNotificacion"] : $model.get("IdTipoNotificacion")
    });
    $.__views.tblOpcionRow.add($.__views.lblDescripcion);
    $.__views.lblDetalle = Ti.UI.createLabel({
        width: "10%",
        height: "10dp",
        top: "26dp",
        font: {
            fontSize: 14,
            fontFamily: "HelveticaNeue"
        },
        textAlign: "right",
        right: "16dp",
        text: "1",
        id: "lblDetalle"
    });
    $.__views.tblOpcionRow.add($.__views.lblDetalle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tblOpcionRow.addEventListener("click", function(e) {
        var tabOpcionesController = Alloy.createController("WinAvisos", {
            IdTipoNotificacion: e.source.textid
        });
        Alloy.Globals.GrupoTab.activeTab.open(tabOpcionesController.getView());
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;