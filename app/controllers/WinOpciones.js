var arg1 = arguments[0] || {};
var data = [];
data = arg1;

//Elementos de Interfaz
$.WinOpciones.title = data.Nombre;
//$.WinAlumnos.setRightNavButton($.addAlumno);
var alumno = Alloy.Collections.Alumno;
var model = alumno.get(data.IdAlumno);
var datos = model.toJSON();
        
if (datos.UsuarioCloud==true){
		//Ya tiene usuario en la nube
				Cloud.Users.login({ 
		    	login: datos.Email,
		    	password: "AlumnoVirtual"
				}, function(e) {
		    		if (e.success) {
		        		Ti.API.info("Logged in user, id = " + e.users[0].id + ", session ID = " + Cloud.sessionId);
		    		} else {
		        		Ti.API.info("Login failed.");
		    		}
		    	
		    	});
		    }
//Listener------------------------------------------------------------------------------------

$.rowAvisos.addEventListener('click', function() {
    var tabOpcionesController = Alloy.createController("WinAvisos", {});
    Alloy.Globals.GrupoTab.activeTab.open(tabOpcionesController.getView());
});

$.WinOpciones.addEventListener('close', function() {
    Cloud.Users.logout(function (e) {
        if (e.success) {
            
        }
        else {
        	alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
         }
    });
});
