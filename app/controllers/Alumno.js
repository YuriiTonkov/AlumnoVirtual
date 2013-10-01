var arg1 = arguments[0] || {};
var data = [];
data = arg1;

$.winNuevoAlumno.title = data.Nombre;
$.winNuevoAlumno.setRightNavButton($.btnGuardar);
var alumno = Alloy.Collections.Alumno;


if (data.IdAlumno == undefined){
    //$.btnAnterior.visible="false";
   // $.btnSiguiente.visible="false";
   $.btnAnotacion.visible = "false";
}else{
        //Si viene un idalumno, la pantalla debe ser de actualizacion, se deben mostrar los datos
       // $.btnAnterior.visible="true";
       // $.btnSiguiente.visible="true";
        //alumno.fetch();
        
        var model = alumno.get(data.IdAlumno);
        var datos = model.toJSON();
        
        
        $.txtNombre.value = datos.Nombre;
        $.txtApellido1.value = datos.Apellido1;
        $.txtApellido2.value = datos.Apellido2;
        $.txtDireccion.value = datos.Direccion;
        $.txtCodPostal.value = datos.CodPostal;
        $.txtTelefono.value = datos.TelContacto;
        $.txtTelefono2.value = datos.TelContacto2;
        $.txtEmail.value = datos.Email;
        $.txtEmail2.value = datos.Email2;
        $.txtPadre.value = datos.Padre;
        $.txtMadre.value = datos.Madre;
        if (datos.foto1_url != undefined){
            $.imgAlumno.image = datos.foto1_url;
            $.imgAlumno.visible=true;
        }
    }

//Funciones --------------------------------------------------------------------------------------------------------

function GuardarAlumno(){
    var coleccionAlumnos = Alloy.Collections.Alumno;
    if (data.IdAlumno == undefined){
        
        //Al venir a undefined el IdAlumno quiere decir que es la creación de un nuevo alumno
        var alumno = Alloy.createModel('Alumno',{Nombre:$.txtNombre.value, 
                                            Apellido1:$.txtApellido1.value,   
                                            Apellido2:$.txtApellido2.value, 
                                            Direccion:$.txtDireccion.value, 
                                            CodPostal:$.txtCodPostal.value,
                                            TelContacto:$.txtTelefono.value,
                                            TelContacto2:$.txtTelefono2.value,
                                            Email:$.txtEmail.value,
                                            Email2:$.txtEmail2.value,
                                            Padre:$.txtPadre.value,
                                            Madre:$.txtMadre.value,
                                            foto1_url:$.imgAlumno.image,
                                            Clase:$.txtClase.value});
                                            //Titanium.API.info("Se almacena la ruta de la imagen: "+$.imgAlumno.image);
       
        coleccionAlumnos.add(alumno);
        alumno.save();
        coleccionAlumnos.fetch();    
        var dialog1 = Ti.UI.createAlertDialog({
            title: 'El alumno se ha creado correctamente.',
            style: Ti.UI.iPhone.AlertDialogStyle.DEFAULT,
            buttonNames: ['Aceptar'],
             });
            dialog1.show(); 
    }else{
    //Al venir idAlumno con un valor quiere decir que es una actualizacion
        var modelActual = coleccion_filtrada.getElement();
        modelActual.set({Nombre:$.txtNombre.value, 
                       Apellido1:$.txtApellido1.value,   
                       Apellido2:$.txtApellido2.value, 
                       Direccion:$.txtDireccion.value, 
                       CodPostal:$.txtCodPostal.value,
                       TelContacto:$.txtTelefono.value,
                       TelContacto2:$.txtTelefono2.value,
                       Email:$.txtEmail.value,
                       Email2:$.txtEmail2.value,
                       Padre:$.txtPadre.value,
                       Madre:$.txtMadre.value,
                       foto1_url:$.imgAlumno.image,
                       Clase:$.txtClase.value});
                       //Titanium.API.info("Se almacena la ruta de la imagen: "+$.imgAlumno.image);
        modelActual.save();
        
        var dialog2 = Ti.UI.createAlertDialog({
            title: 'La información del alumno se ha almacenado correctamente.',
            style: Ti.UI.iPhone.AlertDialogStyle.DEFAULT,
            buttonNames: ['Aceptar'],
             });
            dialog2.show();
    }
    
    
    
}

function sacarFoto(){
    Titanium.Media.showCamera({
      success:function(event)
      {
            var cropRect = event.cropRect;
            var image = event.media;
            var d=new Date();
            var filename = d.getTime() + ".png";
            var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
            f.write(image);
            $.imgAlumno.image=f.nativePath;
            $.imgAlumno.visible=true;
            //Titanium.API.info('taken picture.. path is;-');
            //Titanium.API.info(f.nativePath);
    }
});
}

function TomarAnotacion(){
    var tabAnotacionController = Alloy.createController("notasAlumno", {"IdAlumno":data.IdAlumno, "Nombre":data.Nombre});
    Alloy.Globals.GrupoTab.activeTab.open(tabAnotacionController.getView());
}





//Listeners -------------------------------------------------------------------------------------------------
$.txtClase.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca la clase',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            //Ti.API.info('e.text: ' + e.text);
            if (e.index === e.source.cancel){
     
            }else{
                $.txtClase.value = e.text;
            }
        });
        dialog.show();
});


$.txtNombre.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el nombre',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            //Ti.API.info('e.text: ' + e.text);
            if (e.index === e.source.cancel){
     
            }else{
                $.txtNombre.value = e.text;
            }
        });
        dialog.show();
});

$.txtApellido1.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el primer apellido',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtApellido1.value = e.text;
            }
        });
        dialog.show();
});

$.txtApellido2.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el segundo apellido',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
           if (e.index === e.source.cancel){
     
            }else{
                $.txtApellido2.value = e.text;
            }
        });
        dialog.show();
});

$.txtDireccion.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca la direccion',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtDireccion.value = e.text;
            }
        });
        dialog.show();
});

$.txtCodPostal.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el código postal',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtCodPostal.value = e.text;
            }
        });
        dialog.show();
});

$.txtTelefono.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el teléfono',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtTelefono.value = e.text;
            }
        });
        dialog.show();
});

$.txtTelefono2.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el teléfono',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtTelefono2.value = e.text;
            }
        });
        dialog.show();
});

$.txtEmail.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el correo electrónico',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtEmail.value = e.text;
            }
        });
        dialog.show();
});

$.txtEmail2.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el correo electrónico',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtEmail2.value = e.text;
            }
        });
        dialog.show();
});

$.txtPadre.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el nombre del padre',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtPadre.value = e.text;
            }
        });
        dialog.show();
});

$.txtMadre.addEventListener("click", function(){
        var dialog = Ti.UI.createAlertDialog({
            title: 'Introduzca el nombre de la madre',
            style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Aceptar', 'Cancelar'],
            cancel: 1,
             });
        dialog.addEventListener('click', function(e){
            if (e.index === e.source.cancel){
     
            }else{
                $.txtMadre.value = e.text;
            }
        });
        dialog.show();
});