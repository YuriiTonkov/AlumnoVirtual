exports.definition = {
	config: {
		columns: {
		    "IdNotificacion": "bigint",
		    "Tipo": "int",
		    "Titulo": "string",
		    "Texto": "string",
		    "Alumno": "int",
		    "Asignatura": "string",
		    "Leida": "boolean",
		    "Nota": "int",
		    "Fecha" : "string",
		    "Profesor":"string"
		},
		adapter: {
			type: "sql",
			collection_name: "Notificacion",
            db_file: "/AlumnoVirtualDB.sqlite",
            db_name: "AlumnoVirtual",
            idAttribute: "IdNotificacion",
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