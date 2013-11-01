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
                Clase: $.txtClase.value,
                EmailProfesor: $.txtEmailProf.value
            });
            coleccionAlumnos.add(alumno);
            alumno.save();
            coleccionAlumnos.fetch();
            $.btnEnviar.visible = true;
            data.IdAlumno = alumno.IdAlumno;
            var dialog1 = Ti.UI.createAlertDialog({
                title: "El alumno se ha creado correctamente.",
                style: Ti.UI.iPhone.AlertDialogStyle.DEFAULT,
                buttonNames: [ "Aceptar" ]
            });
            dialog1.show();
        } else {
            var modelActual = coleccionAlumnos.get(data.IdAlumno);
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
                Clase: $.txtClase.value,
                EmailProfesor: $.txtEmailProf.value
            });
            modelActual.save();
            true == modelActual.UsuarioCloud && Cloud.Users.update({
                email: $.txtEmail.value,
                first_name: $.txtNombre.value,
                last_name: $.txtApellido1.value,
                password: "AlumnoVirtual",
                password_confirmation: "AlumnoVirtual",
                role: "Alumno",
                photo: null == datos.foto1_url ? null : Titanium.Filesystem.getFile($.imgAlumno.image),
                custom_fields: {
                    Madre: $.txtMadre.value,
                    Padre: $.txtPadre.value,
                    Direccion: $.txtDireccion.value,
                    CodPostal: $.txtCodPostal.value,
                    Telefono1: $.txtTelefono.value,
                    Telefono2: $.txtTelefono2.value,
                    Email: $.txtEmail2.value,
                    Email2: $.txtEmail2.value,
                    Apellido2: $.txtApellido2.value,
                    Clase: $.txtClase.value,
                    EmailProfesor: $.txtEmailProf.value
                }
            }, function(e) {
                e.success ? alert("Updated!") : error(e);
            });
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
    function consultarDatos(emailProfesorParam, profesorParam, callback) {
        Cloud.Users.query({
            where: {
                role: "Profesor",
                email: emailProfesorParam
            }
        }, function(e) {
            if (e.success) {
                profesorParam = e.users.length > 0 ? e.users[0].id : "";
                alert("Profesor=" + profesorParam);
            } else {
                profesorParam = "";
                alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
            }
            callback(emailProfesorParam, profesorParam);
        });
    }
    function EnviarDatos() {
        var alu = Alloy.Collections.Alumno;
        alu.fetch();
        var model = alu.get(data.IdAlumno);
        var datos2 = model.toJSON();
        true == datos2.UsuarioCloud ? consultarDatos(datos.EmailProfesor, "", function(callbackEmail, callbackProf) {
            var profe = callbackProf;
            "" == profe ? alert("El Mail de profesor no aparece en nuestra Base de Datos. Compruebe los datos") : Cloud.Friends.add({
                user_ids: profe
            }, function(e) {
                if (e.success) {
                    alert("La solicitud se ha enviado al profesor.");
                    $.btnEnviar.visible = false;
                } else alert("La solicitud ha fallado.");
            });
        }) : consultarDatos(datos2.EmailProfesor, "", function(callbackEmail, callbackProf) {
            var profesor = callbackProf;
            "" == profesor ? alert("El Mail de profesor no aparece en nuestra Base de Datos. Compruebe los datos") : Cloud.Users.create({
                email: datos2.Email,
                first_name: datos2.Nombre,
                last_name: datos2.Apellido1,
                password: "AlumnoVirtual",
                password_confirmation: "AlumnoVirtual",
                role: "Alumno",
                photo: null == datos2.foto1_url ? null : Titanium.Filesystem.getFile(datos2.foto1_url),
                custom_fields: {
                    Madre: datos2.Madre,
                    Padre: datos2.Padre,
                    Direccion: datos2.Direccion,
                    CodPostal: datos2.CodPostal,
                    Telefono1: datos2.Telefono1,
                    Telefono2: datos2.Telefono2,
                    Email: datos2.Email,
                    Email2: datos2.Email2,
                    Apellido2: datos2.Apellido2,
                    Clase: datos2.Clase,
                    EmailProfesor: datos2.EmailProfesor
                }
            }, function(e) {
                if (e.success) {
                    var coleccionAlu = Alloy.Collections.Alumno;
                    var modelActual = coleccionAlu.get(data.IdAlumno);
                    modelActual.set({
                        UsuarioCloud: true
                    });
                    modelActual.save();
                    var user = e.users[0];
                    alert("Success:\nid: " + user.id + "\n" + "sessionId: " + Cloud.sessionId + "\n" + "first name: " + user.first_name + "\n" + "last name: " + user.last_name);
                } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                Cloud.Friends.add({
                    user_ids: profesor
                }, function(e) {
                    e.success ? alert("La solicitud se ha enviado al profesor.") : alert("La solicitud ha fallado.");
                });
            });
        });
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
        barColor: "#e7effa",
        translucent: "false",
        backgroundColor: "e2effa",
        id: "winNuevoAlumno"
    });
    $.__views.winNuevoAlumno && $.addTopLevelView($.__views.winNuevoAlumno);
    $.__views.__alloyId0 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId0"
    });
    var __alloyId1 = [];
    __alloyId1.push($.__views.__alloyId0);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Nombre",
        id: "__alloyId2"
    });
    $.__views.__alloyId0.add($.__views.__alloyId2);
    $.__views.txtNombre = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtNombre"
    });
    $.__views.__alloyId0.add($.__views.txtNombre);
    $.__views.__alloyId3 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId3"
    });
    __alloyId1.push($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "1er Apellido",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.txtApellido1 = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtApellido1"
    });
    $.__views.__alloyId3.add($.__views.txtApellido1);
    $.__views.__alloyId5 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId5"
    });
    __alloyId1.push($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "2o Apellido",
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.txtApellido2 = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtApellido2"
    });
    $.__views.__alloyId5.add($.__views.txtApellido2);
    $.__views.__alloyId7 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId7"
    });
    __alloyId1.push($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Direccion",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.txtDireccion = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtDireccion"
    });
    $.__views.__alloyId7.add($.__views.txtDireccion);
    $.__views.__alloyId9 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId9"
    });
    __alloyId1.push($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Cod.Postal",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.txtCodPostal = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtCodPostal"
    });
    $.__views.__alloyId9.add($.__views.txtCodPostal);
    $.__views.__alloyId11 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId11"
    });
    __alloyId1.push($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Telefono",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.txtTelefono = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtTelefono"
    });
    $.__views.__alloyId11.add($.__views.txtTelefono);
    $.__views.__alloyId13 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId13"
    });
    __alloyId1.push($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Telefono2",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.txtTelefono2 = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtTelefono2"
    });
    $.__views.__alloyId13.add($.__views.txtTelefono2);
    $.__views.__alloyId15 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId15"
    });
    __alloyId1.push($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Email",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.txtEmail = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtEmail"
    });
    $.__views.__alloyId15.add($.__views.txtEmail);
    $.__views.__alloyId17 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId17"
    });
    __alloyId1.push($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Email2",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.txtEmail2 = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtEmail2"
    });
    $.__views.__alloyId17.add($.__views.txtEmail2);
    $.__views.__alloyId19 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId19"
    });
    __alloyId1.push($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Nombre Padre",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.txtPadre = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtPadre"
    });
    $.__views.__alloyId19.add($.__views.txtPadre);
    $.__views.__alloyId21 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId21"
    });
    __alloyId1.push($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Nombre Madre",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.txtMadre = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtMadre"
    });
    $.__views.__alloyId21.add($.__views.txtMadre);
    $.__views.__alloyId23 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId23"
    });
    __alloyId1.push($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Email Profesor",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    $.__views.txtEmailProf = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtEmailProf"
    });
    $.__views.__alloyId23.add($.__views.txtEmailProf);
    $.__views.__alloyId25 = Ti.UI.createTableViewRow({
        backgroundColor: "white",
        height: "40dp",
        id: "__alloyId25"
    });
    __alloyId1.push($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        width: "100%",
        height: "12dp",
        textAlign: "left",
        left: "16dp",
        top: "1dp",
        font: {
            fontSize: 10,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        text: "Clase",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.txtClase = Ti.UI.createTextField({
        top: "15dp",
        width: "100%",
        height: "20dp",
        textAlign: "left",
        left: "45dp",
        font: {
            fontSize: 16,
            fontFamily: "HelveticaNeue-UltraLight"
        },
        editable: "false",
        id: "txtClase"
    });
    $.__views.__alloyId25.add($.__views.txtClase);
    $.__views.Marco = Ti.UI.createTableView({
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        backgroundImage: "backGround320x416Base.png",
        top: "10%",
        data: __alloyId1,
        id: "Marco"
    });
    $.__views.winNuevoAlumno.add($.__views.Marco);
    $.__views.imgAlumno = Ti.UI.createImageView({
        left: "10%",
        id: "imgAlumno",
        height: "15%",
        width: "16%",
        top: "2%"
    });
    $.__views.winNuevoAlumno.add($.__views.imgAlumno);
    sacarFoto ? $.__views.imgAlumno.addEventListener("click", sacarFoto) : __defers["$.__views.imgAlumno!click!sacarFoto"] = true;
    $.__views.btnEnviar = Ti.UI.createButton({
        top: "2%",
        borderRadius: "5dp",
        left: "40%",
        height: "25dp",
        width: "80dp",
        id: "btnEnviar",
        title: "Enviar"
    });
    $.__views.winNuevoAlumno.add($.__views.btnEnviar);
    EnviarDatos ? $.__views.btnEnviar.addEventListener("click", EnviarDatos) : __defers["$.__views.btnEnviar!click!EnviarDatos"] = true;
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
    if (void 0 == data.IdAlumno) $.btnEnviar.visible = "false"; else {
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
        $.txtEmailProf.value = datos.EmailProfesor;
        if (void 0 != datos.foto1_url) {
            $.imgAlumno.image = datos.foto1_url;
            $.imgAlumno.visible = true;
        }
        true == datos.UsuarioCloud && Cloud.Users.login({
            login: datos.Email,
            password: "AlumnoVirtual"
        }, function(e) {
            if (e.success) {
                Ti.API.info("Logged in user, id = " + e.users[0].id + ", session ID = " + Cloud.sessionId);
                Cloud.Friends.search({
                    user_id: e.users[0].id
                }, function(y) {
                    if (y.success) $.btnEnviar.visible = 0 == y.users.length ? true : false; else {
                        table.setData([ {
                            title: y.error && y.message || y
                        } ]);
                        error(y);
                    }
                });
            } else Ti.API.info("Login failed.");
        });
    }
    $.winNuevoAlumno.addEventListener("close", function() {
        Cloud.Users.logout(function(e) {
            e.success || alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    });
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
    $.txtEmailProf.addEventListener("click", function() {
        var dialog = Ti.UI.createAlertDialog({
            title: "Introduzca el email del profesor",
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: [ "Aceptar", "Cancelar" ],
            cancel: 1
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel || ($.txtEmailProf.value = e.text);
        });
        dialog.show();
    });
    __defers["$.__views.imgAlumno!click!sacarFoto"] && $.__views.imgAlumno.addEventListener("click", sacarFoto);
    __defers["$.__views.btnEnviar!click!EnviarDatos"] && $.__views.btnEnviar.addEventListener("click", EnviarDatos);
    __defers["$.__views.btnGuardar!click!GuardarAlumno"] && $.__views.btnGuardar.addEventListener("click", GuardarAlumno);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;