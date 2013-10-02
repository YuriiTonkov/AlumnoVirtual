exports.definition = {
	config: {
		columns: {
		    "IdTipoNotificacion": "int",
		    "Nombre": "string",
		    "Descripcion": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "TipoNotificacion",
            db_file: "/AlumnoVirtualDB.sqlite",
            db_name: "AlumnoVirtual",
            idAttribute: "IdTipoNotificacion",
            remoteBackup:"true"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};

var Alloy = require('alloy'),
    _ = require("alloy/underscore")._,
	model, collection;

model = Alloy.M('Tipo_Notificacion',
	 exports.definition,
	[]
);

collection = Alloy.C('Tipo_Notificacion',
	 exports.definition,
	 model
);

exports.Model = model;
exports.Collection = collection;