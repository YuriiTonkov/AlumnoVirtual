function Controller() {
    function GuardarAlumno() {
        var coleccionAlumnos = Alloy.Collections.Alumno;
        if (void 0 == data.IdAlumno) {
            var alumno = Alloy.createModel("Alumno", {
                Nombre: $.txtNombre.value,
                Apellido1: $.txtApellido1.value,
                Apellido2: $.txtApellido2.value,
                Direccion: $.txtDireccion.value,
                CodPostal: $.txtCodPostal.value,
                TelContacto: $.txtTelefono.value,
                TelContacto2: $.txtTelefono2.value,
                Email: $.txtEmail.value,
                Email2: $.txtEmail2.value,
                Padre: $.txtPadre.value,
                Madre: $.txtMadre.value,
                foto1_url: $.imgAlumno.image,
                Clase: $.txtClase.value
            });
            coleccionAlumnos.add(alumno);
            alumno.save();
            coleccionAlumnos.fetch();
            var dialog1 = Ti.UI.createAlertDialog({
                title: "El alumno se ha creado correctamente.",
                style: Ti.UI.iPhone.AlertDialogStyle.DEFAULT,
                buttonNames: [ "Aceptar" ]
            });
            dialog1.show();
        } else {
            var modelActual = coleccion_filtrada.getElement();
            modelActual.set({
                Nombre: $.txtNombre.value,
                Apellido1: $.txtApellido1.value,
                Apellido2: $.txtApellido2.value,
                Direccion: $.txtDireccion.value,
                CodPostal: $.txtCodPostal.value,
                TelContacto: $.txtTelefono.value,
                TelContacto2: $.txtTelefono2.value,
                Email: $.txtEmail.value,
                Email2: $.txtEmail2.value,
                Padre: $.txtPadre.value,
                Madre: $.txtMadre.value,
                foto1_url: $.imgAlumno.image,
                Clase: $.txtClase.value
            });
            modelActual.save();
            var dialog2 = Ti.UI.createAlertDialog({
                title: "La información del alumno se ha almacenado correctamente.",
                style: Ti.UI.iPhone.AlertDialogStyle.DEFAULT,
                buttonNames: [ "Aceptar" ]
            });
            dialog2.show();
        }
    }
    function sacarFoto() {
        Titanium.Media.showCamera({
            success: function(event) {
                event.cropRect;
                var image = event.media;
                var d = new Date();
                var filename = d.getTime() + ".png";
                var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
                f.write(image);
                $.imgAlumno.image = f.nativePath;
                $.imgAlumno.visible = true;
            }
        });
    }
    function TomarAnotacion() {
        var tabAnotacionController = Alloy.createController("notasAlumno", {
            IdAlumno: data.IdAlumno,
            Nombre: data.Nombre
        });
        Alloy.Globals.GrupoTab.activeTab.open(tabAnotacionController.getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Alumno";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.winNuevoAlumno = Ti.UI.createWindow({
        id: "winNuevoAlumno"
    });
    $.__views.winNuevoAlumno && $.addTopLevelView($.__views.winNuevoAlumno);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        top: "15%",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "90%",
        width: "100%"
    });
    $.__views.winNuevoAlumno.add($.__views.scrollView);
    $.__views.viewAlumno = Ti.UI.createView({
        backgroundColor: "white",
        borderRadius: "5dp",
        top: "0dp",
        left: "24dp",
        width: "85%",
        id: "viewAlumno"
    });
    $.__views.scrollView.add($.__views.viewAlumno);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "0dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "Nombre",
        id: "__alloyId0"
    });
    $.__views.viewAlumno.add($.__views.__alloyId0);
    $.__views.txtNombre = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "15dp",
        id: "txtNombre"
    });
    $.__views.viewAlumno.add($.__views.txtNombre);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "45dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "1er Apellido",
        id: "__alloyId1"
    });
    $.__views.viewAlumno.add($.__views.__alloyId1);
    $.__views.txtApellido1 = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "60dp",
        id: "txtApellido1"
    });
    $.__views.viewAlumno.add($.__views.txtApellido1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "90dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "2o Apellido",
        id: "__alloyId2"
    });
    $.__views.viewAlumno.add($.__views.__alloyId2);
    $.__views.txtApellido2 = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "105dp",
        id: "txtApellido2"
    });
    $.__views.viewAlumno.add($.__views.txtApellido2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "135dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "Direccion",
        id: "__alloyId3"
    });
    $.__views.viewAlumno.add($.__views.__alloyId3);
    $.__views.txtDireccion = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "150dp",
        id: "txtDireccion"
    });
    $.__views.viewAlumno.add($.__views.txtDireccion);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "180dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "Cod.Postal",
        id: "__alloyId4"
    });
    $.__views.viewAlumno.add($.__views.__alloyId4);
    $.__views.txtCodPostal = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "195dp",
        id: "txtCodPostal"
    });
    $.__views.viewAlumno.add($.__views.txtCodPostal);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "225dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "Telefono",
        id: "__alloyId5"
    });
    $.__views.viewAlumno.add($.__views.__alloyId5);
    $.__views.txtTelefono = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "240dp",
        id: "txtTelefono"
    });
    $.__views.viewAlumno.add($.__views.txtTelefono);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "270dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "Telefono2",
        id: "__alloyId6"
    });
    $.__views.viewAlumno.add($.__views.__alloyId6);
    $.__views.txtTelefono2 = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "285dp",
        id: "txtTelefono2"
    });
    $.__views.viewAlumno.add($.__views.txtTelefono2);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "315dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "Email",
        id: "__alloyId7"
    });
    $.__views.viewAlumno.add($.__views.__alloyId7);
    $.__views.txtEmail = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "330dp",
        id: "txtEmail"
    });
    $.__views.viewAlumno.add($.__views.txtEmail);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "360dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "Email2",
        id: "__alloyId8"
    });
    $.__views.viewAlumno.add($.__views.__alloyId8);
    $.__views.txtEmail2 = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "375dp",
        id: "txtEmail2"
    });
    $.__views.viewAlumno.add($.__views.txtEmail2);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "405dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "Nombre Padre",
        id: "__alloyId9"
    });
    $.__views.viewAlumno.add($.__views.__alloyId9);
    $.__views.txtPadre = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "420dp",
        id: "txtPadre"
    });
    $.__views.viewAlumno.add($.__views.txtPadre);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "450dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "Nombre Madre",
        id: "__alloyId10"
    });
    $.__views.viewAlumno.add($.__views.__alloyId10);
    $.__views.txtMadre = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "465dp",
        id: "txtMadre"
    });
    $.__views.viewAlumno.add($.__views.txtMadre);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        width: "100%",
        height: "16dp",
        textAlign: "left",
        left: "6dp",
        top: "495dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue"
        },
        text: "Clase",
        id: "__alloyId11"
    });
    $.__views.viewAlumno.add($.__views.__alloyId11);
    $.__views.txtClase = Ti.UI.createTextField({
        borderRadius: "3dp",
        backgroundColor: "EEE",
        width: "94%",
        height: "24dp",
        textAlign: "left",
        left: "7dp",
        top: "510dp",
        id: "txtClase"
    });
    $.__views.viewAlumno.add($.__views.txtClase);
    $.__views.imgAlumno = Ti.UI.createImageView({
        left: "10%",
        id: "imgAlumno",
        height: "15%",
        width: "16%",
        top: "2%"
    });
    $.__views.winNuevoAlumno.add($.__views.imgAlumno);
    sacarFoto ? $.__views.imgAlumno.addEventListener("click", sacarFoto) : __defers["$.__views.imgAlumno!click!sacarFoto"] = true;
    $.__views.btnAnotacion = Ti.UI.createButton({
        top: "2%",
        borderRadius: "5dp",
        left: "40%",
        height: "25dp",
        width: "80dp",
        id: "btnAnotacion",
        title: "Notas"
    });
    $.__views.winNuevoAlumno.add($.__views.btnAnotacion);
    TomarAnotacion ? $.__views.btnAnotacion.addEventListener("click", TomarAnotacion) : __defers["$.__views.btnAnotacion!click!TomarAnotacion"] = true;
    $.__views.btnGuardar = Ti.UI.createButton({
        top: "-50dp",
        id: "btnGuardar",
        title: "Guardar"
    });
    $.__views.winNuevoAlumno.add($.__views.btnGuardar);
    GuardarAlumno ? $.__views.btnGuardar.addEventListener("click", GuardarAlumno) : __defers["$.__views.btnGuardar!click!GuardarAlumno"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var arg1 = arguments[0] || {};
    var data = [];
    data = arg1;
    $.winNuevoAlumno.title = data.Nombre;
    $.winNuevoAlumno.setRightNavButton($.btnGuardar);
    var alumno = Alloy.Collections.Alumno;
    if (void 0 == data.IdAlumno) $.btnAnotacion.visible = "false"; else {
        var model = alumno.get(data.IdAlumno);
        var datos = model.toJSON();
        $.txtNombre.value = datos.Nombre;
        $.txtApellido1.value = datos.Apellido1;
        $.txtApellido2.value = datos.Apellido2;
        $.txtDireccion.value = datos.Direccion;
        $.txtCodPostal.value = datos.CodPostal;
        $.txtTelefono.value = datos.TelContacto;
        $.txtTelefono2.value = datos.TelContacto2;
        $.txtEmail.value = datos.Email;
        $.txtEmail2.value = datos.Email2;
        $.txtPadre.value = datos.Padre;
        $.txtMadre.value = datos.Madre;
        if (void 0 != datos.foto1_url) {
            $.imgAlumno.image = datos.foto1_url;
            $.imgAlumno.visible = true;
        }
    }
    $.txtClase.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca la clase",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtClase.value = e.text);
        });
        dialog.show();
    });
    $.txtNombre.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el nombre",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtNombre.value = e.text);
        });
        dialog.show();
    });
    $.txtApellido1.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el primer apellido",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtApellido1.value = e.text);
        });
        dialog.show();
    });
    $.txtApellido2.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el segundo apellido",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtApellido2.value = e.text);
        });
        dialog.show();
    });
    $.txtDireccion.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca la direccion",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtDireccion.value = e.text);
        });
        dialog.show();
    });
    $.txtCodPostal.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el código postal",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtCodPostal.value = e.text);
        });
        dialog.show();
    });
    $.txtTelefono.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el teléfono",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtTelefono.value = e.text);
        });
        dialog.show();
    });
    $.txtTelefono2.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el teléfono",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtTelefono2.value = e.text);
        });
        dialog.show();
    });
    $.txtEmail.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el correo electrónico",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtEmail.value = e.text);
        });
        dialog.show();
    });
    $.txtEmail2.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el correo electrónico",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtEmail2.value = e.text);
        });
        dialog.show();
    });
    $.txtPadre.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el nombre del padre",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtPadre.value = e.text);
        });
        dialog.show();
    });
    $.txtMadre.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el nombre de la madre",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtMadre.value = e.text);
        });
        dialog.show();
    });
    __defers["$.__views.imgAlumno!click!sacarFoto"] && $.__views.imgAlumno.addEventListener("click", sacarFoto);
    __defers["$.__views.btnAnotacion!click!TomarAnotacion"] && $.__views.btnAnotacion.addEventListener("click", TomarAnotacion);
    __defers["$.__views.btnGuardar!click!GuardarAlumno"] && $.__views.btnGuardar.addEventListener("click", GuardarAlumno);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;