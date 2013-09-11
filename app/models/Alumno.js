exports.definition = {
	config: {
		columns: {
		    "IdAlumno": "int",
		    "Nombre": "string",
		    "Apellido1": "string",
		    "Apellido2": "string",
		    "Direccion": "string",
		    "CodPostal": "integer",
		    "Telefono1": "integer",
		    "Telefono2": "string",
		    "Padre": "string",
		    "Madre": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "Alumno"
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