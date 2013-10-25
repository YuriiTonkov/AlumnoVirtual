function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ItemRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tblItemRow = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "50dp",
        data: "undefined" != typeof $model.__transform["IdNotificacion"] ? $model.__transform["IdNotificacion"] : $model.get("IdNotificacion"),
        hasChild: "true",
        id: "tblItemRow"
    });
    $.__views.tblItemRow && $.addTopLevelView($.__views.tblItemRow);
    $.__views.lblEncabezadoIzq = Ti.UI.createLabel({
        width: "50%",
        height: "10dp",
        top: "3dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "left",
        left: "16dp",
        id: "lblEncabezadoIzq",
        text: "undefined" != typeof $model.__transform["Profesor"] ? $model.__transform["Profesor"] : $model.get("Profesor")
    });
    $.__views.tblItemRow.add($.__views.lblEncabezadoIzq);
    $.__views.lblEncabezadoDcha = Ti.UI.createLabel({
        width: "50%",
        height: "10dp",
        top: "3dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "right",
        right: "16dp",
        id: "lblEncabezadoDcha",
        text: "undefined" != typeof $model.__transform["Fecha"] ? $model.__transform["Fecha"] : $model.get("Fecha")
    });
    $.__views.tblItemRow.add($.__views.lblEncabezadoDcha);
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
        text: "undefined" != typeof $model.__transform["Titulo"] ? $model.__transform["Titulo"] : $model.get("Titulo")
    });
    $.__views.tblItemRow.add($.__views.lblTitulo);
    $.__views.lblSubtitulo = Ti.UI.createLabel({
        width: "100%",
        height: "10dp",
        top: "35dp",
        font: {
            fontSize: 12,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        textAlign: "left",
        left: "16dp",
        id: "lblSubtitulo",
        text: "undefined" != typeof $model.__transform["Subtitulo"] ? $model.__transform["Subtitulo"] : $model.get("Subtitulo")
    });
    $.__views.tblItemRow.add($.__views.lblSubtitulo);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tblItemRow.addEventListener("click", function(e) {
        var tabItemController = Alloy.createController("VerAviso", {
            IdNotificacion: e.source.data
        });
        Alloy.Globals.GrupoTab.activeTab.open(tabItemController.getView());
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;