var arg1 = arguments[0] || {};
var data = [];
data = arg1;



//Elementos de Interfaz
$.WinOpciones.title = data.Nombre;
var alumno = Alloy.Collections.Alumno;
var model = alumno.get(data.IdAlumno);
var datos = model.toJSON();

//Sincronizacion con la información en la NUBE.
      
if (datos.UsuarioCloud==true){

	$.activityScreen.show();
		//Ya tiene usuario en la nube
				Cloud.Users.login({ 
		    	login: datos.Email,
		    	password: "AlumnoVirtual"
				}, function(e) {
		    		if (e.success) {
		        		Ti.API.info("Logged in user, id = " + e.users[0].id + ", session ID = " + Cloud.sessionId);
		        		//Ahora vamos a proceder a descargarnos toda la información de mensajes existente.
						  Cloud.Messages.showInbox(function (u) {
				            if (u.success) {
					            if (u.messages.length == 0) {
				                    //alert('No hay mensajes' );
				                   var notificaciones = Alloy.Collections.Notificacion;
				                   notificaciones.fetch();
				                   var notas = notificaciones.where({Alumno: datos.IdAlumno, Tipo:1, Leida:0});
				                   $.numNotas.text = notas.length;
				                   var avisos = notificaciones.where({Alumno: datos.IdAlumno, Tipo:2, Leida:0});
				                   $.numAvisos.text = avisos.length;
				                   var apuntes = notificaciones.where({Alumno: datos.IdAlumno, Tipo:3, Leida:0});
				                   $.numApuntes.text = apuntes.length;
				                   $.activityScreen.hide();
				                } else {
					                var data = [];
					                
						            for (var i = 0, l = u.messages.length; i < l; i++) {
				              	        //Por cada uno de los mensajes los descargaremos en la BD de la aplicación
				              	        var mensaje = u.messages[i];
											    	//Aqui se hace la insercción de la notificacion en la tabla segun el tipo que sea.
											    	var model = Alloy.createModel('Notificacion',{
													    "Tipo": mensaje.custom_fields.IdTipo,
													    "Titulo": mensaje.subject,
													    "Texto": mensaje.body,
													    "Alumno": data.IdAlumno,
													    "Asignatura": mensaje.custom_fields.Asignatura,
													    "Nota": mensaje.custom_fields.Nota, 
													    "Leida": false});
											    	var notificaciones = Alloy.Collections.Notificacion;
										            notificaciones.add(model);
										            model.save();
										            notificaciones.fetch();
													
														    	
											    	//Una vez se ha terminado la insercción se borra de la nube
											    	Cloud.Messages.remove({
													            message_id: mensaje.id
													        }, function (e) {
													            if (e.success) {
													                
													            } else {
													                alert('No se ha actualizado la información online' +e.message);
													            }
													        });
				                    }
						            var notas = notificaciones.where({Alumno: datos.IdAlumno, Tipo:1, Leida:0});
								    $.numNotas.text = notas.length;
								    var avisos = notificaciones.where({Alumno: datos.IdAlumno, Tipo:2, Leida:0});
								    $.numAvisos.text = avisos.length;
								    var apuntes = notificaciones.where({Alumno: datos.IdAlumno, Tipo:3, Leida:0});
								    $.numApuntes.text = apuntes.length;
								    $.activityScreen.hide();
								     
					            }
				            } else {
								alert("Error de sincronizacion"+  u.message);
								$.activityScreen.hide();
				            }
				        });
		        		
		    		} else {
		        		alert("Login failed.");
		        		$.activityScreen.hide();
		    		}
		    	
		    	});
		    }




//Listener------------------------------------------------------------------------------------
$.rowNotas.addEventListener('click', function() {
    var tab = Alloy.createController("WinListado", {"alumno": datos.IdAlumno,"item":1});
        Alloy.Globals.GrupoTab.activeTab.open(tab.getView());
});

$.rowAvisos.addEventListener('click', function() {
    var tab = Alloy.createController("WinListado", {"alumno": datos.IdAlumno,"item":2});
        Alloy.Globals.GrupoTab.activeTab.open(tab.getView());
});

$.rowApuntes.addEventListener('click', function() {
    var tab = Alloy.createController("WinListado", {"alumno": datos.IdAlumno,"item":3});
        Alloy.Globals.GrupoTab.activeTab.open(tab.getView());
});

$.WinOpciones.addEventListener('close', function() {
    Cloud.Users.logout(function (e) {
        if (e.success) {
           $.destroy(); 
        }
        else {
        	alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
         }
    });
});

$.WinOpciones.addEventListener('focus',function(e){
    // Ti.API.info('ENTRO EN EL FOCUS');
    var notificaciones = Alloy.Collections.Notificacion;
    notificaciones.fetch();
    var notas = notificaciones.where({Alumno: datos.IdAlumno, Tipo:1, Leida:0});
	$.numNotas.text = notas.length;
	var avisos = notificaciones.where({Alumno: datos.IdAlumno, Tipo:2, Leida:0});
	$.numAvisos.text = avisos.length;
	var apuntes = notificaciones.where({Alumno: datos.IdAlumno, Tipo:3, Leida:0});
	$.numApuntes.text = apuntes.length;
	
});
