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


$.TablaItems.addEventListener("click", function(e){
    //console.debug("Añadimos el handler para el evento de click");
    switch (data.item){
	case 1:
		if (e.source.id == "tblItemRow") {
        var tabItemController = Alloy.createController("VerNota", {"IdNotificacion":e.source.data});
        Alloy.Globals.GrupoTab.activeTab.open(tabItemController.getView());
      } else {
      	var tabItemController = Alloy.createController("VerNota", {"IdNotificacion":e.source.textid});
        Alloy.Globals.GrupoTab.activeTab.open(tabItemController.getView());
      }
	break;
	case 2:
		if (e.source.id == "tblItemRow") {
        var tabItemController = Alloy.createController("VerAviso", {"IdNotificacion":e.source.data});
        Alloy.Globals.GrupoTab.activeTab.open(tabItemController.getView());
      } else {
      	var tabItemController = Alloy.createController("VerAviso", {"IdNotificacion":e.source.textid});
        Alloy.Globals.GrupoTab.activeTab.open(tabItemController.getView());
      }
	break;
	case 3:
		if (e.source.id == "tblItemRow") {
        var tabItemController = Alloy.createController("VerApunte", {"IdNotificacion":e.source.data});
        Alloy.Globals.GrupoTab.activeTab.open(tabItemController.getView());
      } else {
      	var tabItemController = Alloy.createController("VerApunte", {"IdNotificacion":e.source.textid});
        Alloy.Globals.GrupoTab.activeTab.open(tabItemController.getView());
      }
	break;
	}
    	
      
});
