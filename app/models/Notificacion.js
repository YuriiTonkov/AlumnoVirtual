exports.definition = {
	config: {
		columns: {
		    "IdNotificacion": "bigint",
		    "Tipo": "int",
		    "Titulo": "string",
		    "Texto": "string",
		    "Alumno": "int",
		    "Asignatura": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "Notificacion"
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