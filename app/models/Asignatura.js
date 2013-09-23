exports.definition = {
	config: {
		columns: {
		    "IdAsignatura": "int",
		    "Nombre": "string",
		    "Descripcion": "string",
		    "Optativa": "boolean",
		    "Curso": "int",
		    "Favorita": "int"
		},
		adapter: {
			type: "sql",
			collection_name: "Asignatura",
            db_file: "/Alumno_VirtualDB.sqlite",
			db_name: "AulaVirtual",
			idAttribute: "IdAsignatura",
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

