var arg1 = arguments[0] || {};
var data = [];
data = arg1;

$.winNuevoAlumno.title = data.Nombre;
$.winNuevoAlumno.setRightNavButton($.btnGuardar);
var alumno = Alloy.Collections.Alumno;


if (data.IdAlumno == undefined){
   $.btnEnviar.visible = "false";
}else{        
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
        if (datos.foto1_url != undefined){
            $.imgAlumno.image = datos.foto1_url;
            $.imgAlumno.visible=true;
        }
        //Si tiene usuario en la nube nos logueamos para poder acceder a su información o actualizarla.
        if (datos.UsuarioCloud==true){
		//Ya tiene usuario en la nube
				Cloud.Users.login({ 
		    	login: datos.Email,
		    	password: "AlumnoVirtual"
				}, function(e) {
		    		if (e.success) {
		        		Ti.API.info("Logged in user, id = " + e.users[0].id + ", session ID = " + Cloud.sessionId);
		        		//Vamos a ver si tiene profesor asociado o no...
						Cloud.Friends.search({
					        user_id: e.users[0].id
				        }, function (y) {
					        if (y.success) {
						        if (y.users.length == 0) {
							       $.btnEnviar.visible=true;
						        } else {
							       $.btnEnviar.visible=false;
						        }
					        }
					        else {
						        table.setData([
							        { title: (y.error && y.message) || y }
						        ]);
						        error(y);
					        }
				        });
		    		} else {
		        		Ti.API.info("Login failed.");
		    		}
				
		
		});
		}	
    }

//Funciones --------------------------------------------------------------------------------------------------------

function GuardarAlumno(){
    var coleccionAlumnos = Alloy.Collections.Alumno;
    if (data.IdAlumno == undefined){
        
        //Al venir a undefined el IdAlumno quiere decir que es la creación de un nuevo alumno
        var alumno = Alloy.createModel('Alumno',{Nombre:$.txtNombre.value, 
                                            Apellido1:$.txtApellido1.value,   
                                            Apellido2:$.txtApellido2.value, 
                                            Direccion:$.txtDireccion.value, 
                                            CodPostal:$.txtCodPostal.value,
                                            TelContacto:$.txtTelefono.value,
                                            TelContacto2:$.txtTelefono2.value,
                                            Email:$.txtEmail.value,
                                            Email2:$.txtEmail2.value,
                                            Padre:$.txtPadre.value,
                                            Madre:$.txtMadre.value,
                                            foto1_url:$.imgAlumno.image,
                                            Clase:$.txtClase.value,
                                            EmailProfesor:$.txtEmailProf.value});
                                            //Titanium.API.info("Se almacena la ruta de la imagen: "+$.imgAlumno.image);
       
        coleccionAlumnos.add(alumno);
        alumno.save();
        coleccionAlumnos.fetch(); 
       
        $.btnEnviar.visible = true;
        data.IdAlumno = alumno.get("IdAlumno");   
        var dialog1 = Ti.UI.createAlertDialog({
            title: 'El alumno se ha creado correctamente.',
            style: Ti.UI.iPhone.AlertDialogStyle.DEFAULT,
            buttonNames: ['Aceptar'],
             });
            dialog1.show(); 
            
    }else{
    //Al venir idAlumno con un valor quiere decir que es una actualizacion
        var modelActual = coleccionAlumnos.get(data.IdAlumno);
        modelActual.set({Nombre:$.txtNombre.value, 
                       Apellido1:$.txtApellido1.value,   
                       Apellido2:$.txtApellido2.value, 
                       Direccion:$.txtDireccion.value, 
                       CodPostal:$.txtCodPostal.value,
                       TelContacto:$.txtTelefono.value,
                       TelContacto2:$.txtTelefono2.value,
                       Email:$.txtEmail.value,
                       Email2:$.txtEmail2.value,
                       Padre:$.txtPadre.value,
                       Madre:$.txtMadre.value,
                       foto1_url:$.imgAlumno.image,
                       Clase:$.txtClase.value,
                       EmailProfesor:$.txtEmailProf.value});
                       //Titanium.API.info("Se almacena la ruta de la imagen: "+$.imgAlumno.image);
        modelActual.save();
        //Si ya tenia un usuario cloud deberemos actualizarlo cuando se actualicen los datos
        if (modelActual.UsuarioCloud==true){
        	Cloud.Users.update({
        		email: $.txtEmail.value,
			    first_name: $.txtNombre.value,
			    last_name: $.txtApellido1.value,
			    password: 'AlumnoVirtual',
			    password_confirmation: 'AlumnoVirtual',
			    role: 'Alumno',
			    photo: (datos.foto1_url==null)?null:Titanium.Filesystem.getFile($.imgAlumno.image),
			    custom_fields:{"Madre":$.txtMadre.value, 
			    			   "Padre":$.txtPadre.value,
			    			   "Direccion": $.txtDireccion.value,
			    			   "CodPostal": $.txtCodPostal.value,
			    			   "Telefono1":$.txtTelefono.value,
			    			   "Telefono2": $.txtTelefono2.value,
			    			   "Email": $.txtEmail2.value,
			    			   "Email2": $.txtEmail2.value,
			    			   "Apellido2": $.txtApellido2.value,
			    			   "Clase": $.txtClase.value,
			    			   "EmailProfesor": $.txtEmailProf.value
			    			   }
			    }, function (e) {
		            if (e.success) {
		                alert('Actualizado!');
		            }
		            else {
		                alert('Hubo un error actualizando los datos cloud');
            		}
       });
       }
       
        var dialog2 = Ti.UI.createAlertDialog({
            title: 'La información del alumno se ha almacenado correctamente.',
            style: Ti.UI.iPhone.AlertDialogStyle.DEFAULT,
            buttonNames: ['Aceptar'],
             });
            dialog2.show();
		}
	}

function sacarFoto(){
    Titanium.Media.showCamera({
      success:function(event)
      {
            var cropRect = event.cropRect;
            var image = event.media;
            var d=new Date();
            var filename = d.getTime() + ".png";
            var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
            var redImage = image.imageAsResized(544,408);
            f.write(redImage);
            $.imgAlumno.image=f.nativePath;
            $.imgAlumno.visible=true;

    }
});
}
function consultarDatos(emailProfesorParam,profesorParam,callback){
	
	Cloud.Users.query({
		    where: {
		        role: 'Profesor',
		        email: emailProfesorParam
		    }
				}, function (e) {
				    if (e.success) {
				    	profesorParam = (e.users.length > 0)?e.users[0].id:'';
				        alert ('Profesor=' + profesorParam);

				      } else {
				      	profesorParam = '';
				        alert('Error:\n' +
				            ((e.error && e.message) || JSON.stringify(e)));
				            
				    }
				    callback(emailProfesorParam, profesorParam);
			});
			
			
}
function EnviarDatos(){
	$.activityScreen.show();
	$.winNuevoAlumno.touchEnabled=false;
	$.btnEnviar.visible=false;
	var alu = Alloy.Collections.Alumno;
	alu.fetch();
	var model = alu.get(data.IdAlumno);
    var datos2 = model.toJSON();
	//Primero habrá que loguearse en el ACS o si no se tiene usuario, crear uno.
	//Si se tiene creado el usuario estará indicado en la BD.
	if (datos2.UsuarioCloud==true){
		//Ya tiene usuario en la nube
		consultarDatos(datos.EmailProfesor, "",function(callbackEmail, callbackProf){
		var profe = callbackProf;
		if (profe == ''){
				alert('El Mail de profesor no aparece en nuestra Base de Datos. Compruebe los datos');
				$.activityScreen.hide();
				$.winNuevoAlumno.touchEnabled=true;
		}else{
				Cloud.Friends.add({ user_ids: profe}, function(e) {
								        if (e.success) {
									        alert('La solicitud se ha enviado al profesor.');
									        $.btnEnviar.visible=false;
								        } else {
									        alert('La solicitud ha fallado.');
								        }
								        $.activityScreen.hide();
				                   		$.winNuevoAlumno.touchEnabled=true;
					        });
			}
	});
	
	}
	else{
		//Aun no tiene usuario, procedemos a crearlo
		//Primero comprobamos que existe el mail del profesor que ha introducido.
		
		
		consultarDatos(datos2.EmailProfesor, "",function(callbackEmail, callbackProf){
				var profesor = callbackProf;
		
		
			
			if (profesor == ''){
				alert('El Mail de profesor no aparece en nuestra Base de Datos. Compruebe los datos');
				
			}else{
						Cloud.Users.create({
						    email: datos2.Email,
						    first_name: datos2.Nombre,
						    last_name: datos2.Apellido1,
						    password: 'AlumnoVirtual',
						    password_confirmation: 'AlumnoVirtual',
						    role: 'Alumno',
						   	photo: (datos2.foto1_url==null)?null:Titanium.Filesystem.getFile(datos2.foto1_url),
						    custom_fields:{"Madre":datos2.Madre, 
						    			   "Padre":datos2.Padre,
						    			   "Direccion": datos2.Direccion,
						    			   "CodPostal": datos2.CodPostal,
						    			   "Telefono1": datos2.TelContacto,
						    			   "Telefono2": datos2.TelContacto2,
						    			   "Email": datos2.Email,
						    			   "Email2": datos2.Email2,
						    			   "Apellido2": datos2.Apellido2,
						    			   "Clase": datos2.Clase,
						    			   "EmailProfesor": datos2.EmailProfesor
						    			   }
					}, function (e) {
					    if (e.success) {
						    //Una vez creado actualizamos el valor en BD del campo UsuarioCloud a true
						    var coleccionAlu = Alloy.Collections.Alumno;
						    var modelActual = coleccionAlu.get(data.IdAlumno);
				       		modelActual.set({UsuarioCloud:true});
							modelActual.save();
							
							//AVISO 
							var user = e.users[0];
							//Realizamos la solicitud al profesor para que pueda añadir al alumno a su dispositivo	
							Cloud.Friends.add({ user_ids: profesor}, function(p) {
								        if (p.success) {
									        alert('La solicitud se ha enviado al profesor.');
									        $.activityScreen.hide();
											$.winNuevoAlumno.touchEnabled=true;
								        } else {
									        alert('La solicitud ha fallado.');
									        $.activityScreen.hide();
											$.winNuevoAlumno.touchEnabled=true;
								        }
								       
					        });
					        alert('Success:\n' +
					            'id: ' + user.id + '\n' +
					            'sessionId: ' + Cloud.sessionId + '\n' +
					            'first name: ' + user.first_name + '\n' +
					            'last name: ' + user.last_name);
						
					    } else {
					        alert('Error:\n' +
					            ((e.error && e.message) || JSON.stringify(e)));
					            $.activityScreen.hide();
								bueno$.winNuevoAlumno.touchEnabled=true;
					           
					    }
					    
					});
				
				}
			});
			
	}
}





//Listeners -------------------------------------------------------------------------------------------------
// Cuando salimos de la página se hace logout del usuario
$.winNuevoAlumno.addEventListener('close', function() {
    Cloud.Users.logout(function (e) {
        if (e.success) {
            
        }
        else {
        	alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
         }
    });
});

$.txtClase.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca la clase',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            //Ti.API.info('e.text: ' + e.text);
            if (e.index === e.source.cancel){
     
            }else{
                $.txtClase.value = e.text;
            }
        });
        dialog.show();
});


$.txtNombre.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el nombre',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            //Ti.API.info('e.text: ' + e.text);
            if (e.index === e.source.cancel){
     
            }else{
                $.txtNombre.value = e.text;
            }
        });
        dialog.show();
});

$.txtApellido1.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el primer apellido',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtApellido1.value = e.text;
            }
        });
        dialog.show();
});

$.txtApellido2.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el segundo apellido',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
           if (e.index === e.source.cancel){
     
            }else{
                $.txtApellido2.value = e.text;
            }
        });
        dialog.show();
});

$.txtDireccion.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca la direccion',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtDireccion.value = e.text;
            }
        });
        dialog.show();
});

$.txtCodPostal.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el código postal',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtCodPostal.value = e.text;
            }
        });
        dialog.show();
});

$.txtTelefono.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el teléfono',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtTelefono.value = e.text;
            }
        });
        dialog.show();
});

$.txtTelefono2.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el teléfono',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtTelefono2.value = e.text;
            }
        });
        dialog.show();
});

$.txtEmail.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el correo electrónico',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtEmail.value = e.text;
            }
        });
        dialog.show();
});

$.txtEmail2.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el correo electrónico',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtEmail2.value = e.text;
            }
        });
        dialog.show();
});

$.txtPadre.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el nombre del padre',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtPadre.value = e.text;
            }
        });
        dialog.show();
});

$.txtMadre.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el nombre de la madre',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtMadre.value = e.text;
            }
        });
        dialog.show();
});

$.txtEmailProf.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el email del profesor',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtEmailProf.value = e.text;
            }
        });
        dialog.show();
});



//-----------PRUEBAS DE VALIDACION-----------------------



var validationCallback = function(errors) {
        if(errors.length > 0) {
                for (var i = 0; i < errors.length; i++) {
                        Ti.API.debug(errors[i].message);
                }
                alert(errors[0].message);
        } else {
               GuardarAlumno();
        }
};


var returnCallback = function() {
        validator.run([
                                {
                                        id: 'nameField',
                                    value: $.txtNombre.value,
                                    display: 'Nombre',    
                                    rules: 'required|max_length[50]'
                                },
                                {
                                        id: 'surname1Field',
                                    value: $.txtApellido1.value,
                                    display: 'Apellido1',    
                                    rules: 'required|max_length[50]'
                                },
                                {
                                        id: 'surname2Field',
                                    value: $.txtApellido2.value,
                                    display: 'Apellido2',    
                                    rules: 'max_length[50]'
                                },
                                {
                                        id: 'emailField',
                                    value: $.txtEmail.value,
                                    display: 'Email',    
                                    rules: 'required|valid_email'
                                },
                                {
                                        id: 'emailProfField',
                                    value: $.txtEmailProf.value,
                                    display: 'Password',    
                                    rules: 'required|valid_email'
                                }
                        ], validationCallback);        
};

$.btnGuardar.addEventListener('click', returnCallback);
