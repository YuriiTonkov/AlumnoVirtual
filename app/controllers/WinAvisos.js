var table = $.TabAvisos;

Cloud.Messages.showInbox(function (e) {
            if (e.success) {
	            if (e.messages.length == 0) {
                    table.setData([
                        { title: 'No hay mensajes' }
                    ]);
                } else {
	                var data = [];
		            for (var i = 0, l = e.messages.length; i < l; i++) {
              	        var message = e.messages[i];
                        var row = Ti.UI.createTableViewRow({
                            title: message.subject,
                            id: message.id
                        });
                        data.push(row);
                    }
		            table.setData(data);
	            }
            } else {
                table.setData([
                    { title: (e.error && e.message) || e }
                ]);
            }
        });
        
        


