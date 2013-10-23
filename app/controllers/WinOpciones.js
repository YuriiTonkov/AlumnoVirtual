var arg1 = arguments[0] || {};
var data = [];
data = arg1;


//Elementos de Interfaz
$.WinOpciones.title = data.Nombre;
//$.WinAlumnos.setRightNavButton($.addAlumno);
var alumno = Alloy.Collections.Alumno;
var model = alumno.get(data.IdAlumno);
var datos = model.toJSON();

//var opcion = Alloy.Collections.TipoNotificacion;
//opcion.fetch();

//Sincronizacion con la información en la NUBE.
var contNotas = 0;
var contAvisos = 0;
var contApuntes = 0;        
if (datos.UsuarioCloud==true){
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
				                    alert('No hay mensajes' );
				                   
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
											    	var Notificaciones = Alloy.Collections.Notificacion;
										            Notificaciones.add(model);
										            model.save();
										            Notificaciones.fetch();
													
													switch(mensaje.custom_fields.IdTipo)
														{
														case 1:
														  contNotas = contNotas+1;
														  break;
														case 2:
														 contAvisos= contAvisos+1;
														  break;
														case 3:
														  contApuntes = contApuntes+1;
														}								    	
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
						             
					            }
				            } else {
								alert("Error de sincronizacion"+  u.message);
				            }
				        });
		        		
		    		} else {
		        		alert("Login failed.");
		    		}
		    	
		    	});
		    }
		    	    










//Listener------------------------------------------------------------------------------------


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
