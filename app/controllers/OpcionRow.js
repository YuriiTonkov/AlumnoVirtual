$.tblOpcionRow.addEventListener("click", function(e){
    //console.debug("Añadimos el handler para el evento de click");
    
    var tabOpcionesController = Alloy.createController("WinAvisos", {"IdTipoNotificacion":e.source.textid});
    Alloy.Globals.GrupoTab.activeTab.open(tabOpcionesController.getView());
    
    
});


