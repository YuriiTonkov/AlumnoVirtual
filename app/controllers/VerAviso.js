var arg1 = arguments[0] || {};
var data = [];
data = arg1;

Cloud.Messages.show({
        message_id: data.IdAviso
    }, function (e) {
	    if (e.success) {
	    	$.txtSubject.value = e.messages[0].subject;
	    
	    	$.txtContent.value = e.messages[0].body;
	    	
	    } else {
	    	alert(e.message);
		}
		
});