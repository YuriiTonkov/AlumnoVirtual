

Cloud.Messages.showInbox(function (e) {
            if (e.success) {
	            if (e.messages.length == 0) {
                     $.TabAvisos.setData([
                        { title: 'No hay mensajes' }
                    ]);
                } else {
	                var data = [];
		            for (var i = 0, l = e.messages.length; i < l; i++) {
              	        var message = e.messages[i];
                        var row = Ti.UI.createTableViewRow({
                            id: message.id,
                            title: message.subject
                        });
                        row.addEventListener("click", function(e){
						    //console.debug("Añadimos el handler para el evento de click");
						    var tabAsignaturasController = Alloy.createController("VerAviso", {"IdAviso":message.id});
						    Alloy.Globals.GrupoTab.activeTab.open(tabAsignaturasController.getView());
							});
                        data.push(row);
                    }
		             $.TabAvisos.setData(data);
	            }
            } else {
                 $.TabAvisos.setData([
                    { title: (e.error && e.message) || e }
                ]);
            }
        });
        
        


