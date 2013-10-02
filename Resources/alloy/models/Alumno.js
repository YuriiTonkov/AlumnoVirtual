exports.definition = {
	config: {
		columns: {
		    "IdAlumno": "int",
		    "Nombre": "string",
            "Apellido1": "string",
            "Apellido2": "string",
		    "Direccion": "string",
		    "CodPostal": "int",
		    "TelContacto": "integer",
		    "TelContacto2": "integer",
		    "Email": "string",
		    "Clase": "string",
		    "Padre": "string",
            "Madre": "string",
            "Email2": "string",
            "foto1_url": "string",
            "foto2_url": "string",
            "IdUsuario":"string",
            "UsuarioCloud":"boolean"
		},
		adapter: {
			type: "sql",
			collection_name: "Alumno",
            db_file: "/AlumnoVirtualDB.sqlite",
            db_name: "AlumnoVirtual",
            idAttribute: "IdAlumno",
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
			
            getAlumnosFromClase: function(idClase){
                var consulta="SELECT * FROM ALUMNO WHERE Clase="+idClase;
                this.fetch({query:consulta});
                return this;
            },
            getElement: function() {
                    return this.currentElement;
                  },
            setElement: function(model) {
                    this.currentElement = model;
                  },
            next: function (){
                this.setElement(this.at(this.indexOf(this.getElement()) + 1));
                return this;
            },
            prev: function() {
                this.setElement(this.at(this.indexOf(this.getElement()) - 1));
                return this;
            }
		});
		
		return Collection;
	}
};



var Alloy = require('alloy'),
    _ = require("alloy/underscore")._,
	model, collection;

model = Alloy.M('Alumno',
	 exports.definition,
	[]
);

collection = Alloy.C('Alumno',
	 exports.definition,
	 model
);

exports.Model = model;
exports.Collection = collection;