function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("Alumno");
    Alloy.Collections.instance("Alumno_Asignatura");
    Alloy.Collections.instance("Asignatura");
    Alloy.Collections.instance("Notificacion");
    Alloy.Collections.instance("Tipo_Notificacion");
    $.__views.GrupoTab = Ti.UI.createTabGroup({
        backgroundImage: "library/images/iphone/backGround640x1136Base.png",
        id: "GrupoTab"
    });
    $.__views.__alloyId37 = Alloy.createController("TabPrincipal", {
        id: "__alloyId37"
    });
    $.__views.GrupoTab.addTab($.__views.__alloyId37.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId39 = Alloy.createController("TabCalendario", {
        id: "__alloyId39"
    });
    $.__views.GrupoTab.addTab($.__views.__alloyId39.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId41 = Alloy.createController("TabConfiguracion", {
        id: "__alloyId41"
    });
    $.__views.GrupoTab.addTab($.__views.__alloyId41.getViewEx({
        recurse: true
    }));
    $.__views.GrupoTab && $.addTopLevelView($.__views.GrupoTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.GrupoTab.open();
    Alloy.Globals.GrupoTab = $.GrupoTab;
    Ti.App.Properties.setString("Ayuda", 0);
    var btnGuardar = Ti.UI.createButton({
        title: "Alta",
        top: 210,
        left: 35,
        style: Ti.UI.iPhone.SystemButton.SAVE
    });
    var btnLogin = Ti.UI.createButton({
        title: "Login",
        top: 250,
        left: 35,
        style: Ti.UI.iPhone.SystemButton.SAVE
    });
    if (void 0 == Ti.App.Properties.getString("Login")) {
        var window = Titanium.UI.createWindow({
            title: "Nuevo usuario"
        });
        window.backgroundImage = 568 > Titanium.Platform.displayCaps.platformHeight ? "library/images/iphone/backGround320x416Login.png" : "library/images/iphone/backGround640x1010Login.png";
        window.open({
            modal: true,
            modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
            modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });
        var txtLogin = Titanium.UI.createTextField({
            top: 90,
            left: 35,
            width: 245,
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "Usuario"
        });
        var txtPass = Titanium.UI.createTextField({
            top: 130,
            left: 35,
            width: 245,
            passwordMask: "true",
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "Contraseña"
        });
        var emailField = Titanium.UI.createTextField({
            top: 170,
            left: 35,
            width: 245,
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            hintText: "Email"
        });
        window.add(txtLogin);
        window.add(txtPass);
        window.add(emailField);
        window.add(btnGuardar);
    } else {
        var window = Titanium.UI.createWindow({
            title: "Bienvenido"
        });
        window.backgroundImage = 568 > Titanium.Platform.displayCaps.platformHeight ? "library/images/iphone/backGround320x416Login.png" : "library/images/iphone/backGround640x1010Login.png";
        window.open({
            modal: true,
            modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
            modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });
        var lblLogin = Titanium.UI.createLabel({
            color: "#000",
            text: "Usuario:",
            top: 90,
            left: 35,
            width: 245,
            height: "auto",
            font: {
                fontSize: "15dp"
            }
        });
        var lblPass = Titanium.UI.createLabel({
            color: "#000",
            text: "Contraseña:",
            top: 160,
            left: 35,
            width: 245,
            height: "auto",
            font: {
                fontSize: "15dp"
            }
        });
        var lblError = Titanium.UI.createLabel({
            color: "#f00",
            visible: "false",
            top: 330,
            left: 35,
            width: "100%",
            height: "auto",
            font: {
                fontSize: "15dp"
            }
        });
        var txtLogin = Titanium.UI.createTextField({
            top: 90,
            left: 35,
            width: 245,
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            font: {
                fontSize: "15dp"
            }
        });
        var txtPass = Titanium.UI.createTextField({
            top: 160,
            left: 35,
            width: 245,
            passwordMask: "true",
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            font: {
                fontSize: "15dp"
            }
        });
        var lblAyuda = Titanium.UI.createLabel({
            color: "#000",
            text: "Ayuda activa:",
            top: 220,
            left: 65,
            width: 100,
            height: "auto",
            font: {
                fontSize: "15dp"
            }
        });
        var chkAyuda = Titanium.UI.createSwitch({
            value: false,
            top: 215,
            left: 160,
            width: "40",
            height: "auto"
        });
        window.add(lblLogin);
        window.add(lblPass);
        window.add(lblError);
        window.add(lblAyuda);
        window.add(txtLogin);
        window.add(txtPass);
        window.add(chkAyuda);
        window.add(btnLogin);
        txtLogin.value = Ti.App.Properties.getString("Login");
    }
    btnGuardar.addEventListener("click", function() {
        Ti.App.Properties.setString("Login", txtLogin.value);
        Ti.App.Properties.setString("Pass", txtPass.value);
        Ti.App.Properties.setString("Email", emailField.value);
        Ti.App.Properties.setString("Ayuda", 1);
        window.close();
    });
    btnLogin.addEventListener("click", function() {
        if (Ti.App.Properties.getString("Login") == txtLogin.value && Ti.App.Properties.getString("Pass") == txtPass.value) {
            Ti.App.Properties.setString("Ayuda", chkAyuda.value);
            window.close();
        } else {
            lblError.text = "Usuario/Contraseña incorrecta";
            lblError.visible = true;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;