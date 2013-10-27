var arg1 = arguments[0] || {};
var data = [];
data = arg1;

var avisos = Alloy.Collections.Notificacion;
avisos.fetch();
var model = avisos.get(data.IdNotificacion);
 var datos = model.toJSON();
 
$.lblEncIzq.text = "Profesor " + datos.Profesor;
$.lblEncDcha.text = datos.Fecha;
$.lblSubject.text = datos.Titulo;
$.txtContent.text = datos.Texto;
$.lblEnlace.text = datos.Enlace;

//Marcamos la notificacion como leida

model.save({Leida: 1});