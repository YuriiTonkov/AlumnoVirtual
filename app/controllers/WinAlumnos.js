//Argumentos trasladados
var arg1 = arguments[0] || {};
var data = [];
data = arg1;
//----------------------------

//Elementos de Interfaz
$.WinAlumnos.title = data.Nombre;
var tab = Alloy.createController("BotoneraClase", {"IdClase":data.IdClase});
$.WinAlumnos.setRightNavButton(tab.getView());
//-----------------------------------------


var alumnos = Alloy.Collections.Alumno;
alumnos.fetch();

//Funciones--------------------------

function filtrado (collection){
    var coleccion_filtrada = collection.where({Clase: data.IdClase});
    return coleccion_filtrada;
}

function nombrecompleto(model){
    var transform = model.toJSON();
    transform.nombrecompleto = transform.Nombre + " " + transform.Apellido1 + " " + transform.Apellido2;
    return transform;
}


//-----------------------------------------

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


//--------------------------------

// Free model-view data binding resources when this view-controller closes
$.WinAlumnos.addEventListener('close', function() {
    $.destroy();
});