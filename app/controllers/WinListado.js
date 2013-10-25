var arg1 = arguments[0] || {};
var data = [];
data = arg1;

var listado = Alloy.Collections.Notificacion;
listado.fetch();

switch (data.item){
	case 1:
		$.WinListado.title = "Notas";
	break;
	case 2:
		$.WinListado.title = "Avisos";
	break;
	case 3:
		$.WinListado.title = "Apuntes";
	break;
	}
   


function Transform(model){
    var transform = model.toJSON();
	transform.Subtitulo = transform.Texto.substring(0,50).concat("...");
    return transform;
}

function Filtrado(collection){
    var coleccion_filtrada = collection.where({Tipo: data.item, Alumno: data.alumno});
    return coleccion_filtrada;
}



