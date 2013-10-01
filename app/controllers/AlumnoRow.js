$.tblAlumnoRow.addEventListener("click", function(e){
    //console.debug("Añadimos el handler para el evento de click");
    if (e.detail==1){
        var alumnos = Alloy.Collections.Alumno;
        var idAlu = e.source.data;
        var tabAlumnosController = Alloy.createController("Alumno", {"IdAlumno":idAlu});
        Alloy.Globals.GrupoTab.activeTab.open(tabAlumnosController.getView());
    }
    else{
    var tabAsignaturasController = Alloy.createController("WinAsignaturas", {"IdAlumno":e.source.textid, "Nombre":e.source.text});
    Alloy.Globals.GrupoTab.activeTab.open(tabAsignaturasController.getView());
    }
    
});