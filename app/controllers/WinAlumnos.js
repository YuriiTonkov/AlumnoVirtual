
//Elementos de Interfaz
$.WinAlumnos.title = "Alumnos";
$.WinAlumnos.setRightNavButton($.addAlumno);
//-----------------------------------------

var alumnos = Alloy.Collections.Alumno;
alumnos.fetch();

//Funciones--------------------------

function nombrecompleto(model){
    var transform = model.toJSON();
    transform.nombrecompleto = transform.Nombre + " " + transform.Apellido1 + " " + transform.Apellido2;
    return transform;
}

function NuevoAlumno(){
	var tabAlumnosController = Alloy.createController("Alumno", {});
    Alloy.Globals.GrupoTab.activeTab.open(tabAlumnosController.getView());
}

//Listeners-----------------------------

$.TablaAlumnos.addEventListener('delete', function(e) 
{
    //console.debug("recogemos:"+e.rowData.data);
    var alumnos = Alloy.Collections.Alumno;
    var model = alumnos.get(e.rowData.data);
    
    model.destroy();
    alumnos.remove(model);
    alumnos.fetch();
});



// Free model-view data binding resources when this view-controller closes
$.WinAlumnos.addEventListener('close', function() {
    $.destroy();
});