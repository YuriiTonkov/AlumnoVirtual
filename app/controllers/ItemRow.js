$.tblItemRow.addEventListener("click", function(e){
    //console.debug("Añadimos el handler para el evento de click");
    
        var tabItemController = Alloy.createController("VerAviso", {"IdNotificacion":e.source.data});
        Alloy.Globals.GrupoTab.activeTab.open(tabItemController.getView());
      
});