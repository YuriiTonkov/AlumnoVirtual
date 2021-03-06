exports.definition = {
	config: {
		columns: {
		    "IdAsignatura": "int",
		    "Nombre": "string",
		    "Descripcion": "string",
		    "Optativa": "boolean",
		    "Curso": "string"
		   
		},
		adapter: {
			type: "sql",
			collection_name: "Asignatura",
            db_file: "/AlumnoVirtualDB.sqlite",
			db_name: "AlumnoVirtual",
			idAttribute: "IdAsignatura",
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
            updateFavorito: function(idAsignatura, favorito){
                try{
                   var query1 = "UPDATE ASIGNATURA SET FAVORITA = "+favorito+" WHERE IdAsignatura= " + idAsignatura;
                   this.fetch({query: query1});
                                       
                }catch (err){
                  //  Ti.API.info('ERROR: ' + JSON.stringify(err))
                }   
            }
        });
		
		
		return Collection;
	}
};

