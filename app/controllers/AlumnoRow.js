$.tblAlumnoRow.addEventListener("click", function(e){
    //console.debug("Añadimos el handler para el evento de click");
    if (e.detail==1){
        var alumnos = Alloy.Collections.Alumno;
        var idAlu = e.source.data;
        var model = alumnos.get(idAlu);
        var array = model.toJSON();
        var tabAlumnosController = Alloy.createController("NuevoAlumno", {"IdAlumno":idAlu,"IdClase":array.Clase});
        Alloy.Globals.GrupoTab.activeTab.open(tabAlumnosController.getView());
    }
    else{
    var tabAsignaturasController = Alloy.createController("WinAsignaturas", {"IdAlumno":e.source.textid, "Nombre":e.source.text});
    Alloy.Globals.GrupoTab.activeTab.open(tabAsignaturasController.getView());
    }
    
});