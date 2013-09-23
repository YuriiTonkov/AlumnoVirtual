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
			collection_name: "Alumno_Asignatura",
            db_file: "/Alumno_VirtualDB.sqlite",
            db_name: "AulaVirtual",
            idAttribute: "IdAlumnoAsignatura",
            remoteBackup:"false"
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

