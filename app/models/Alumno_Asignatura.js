exports.definition = {
	config: {
		columns: {
		    "IdAlumnoAsignatura": "int",
		    "Alumno": "int",
		    "Asignatura": "int",
		    "FechaInicio": "date"
		},
		adapter: {
			type: "sql",
			collection_name: "AlumnoAsignatura",
            db_file: "/AlumnoVirtualDB.sqlite",
            db_name: "AlumnoVirtual",
            idAttribute: "IdAlumnoAsignatura",
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

