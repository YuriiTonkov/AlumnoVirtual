exports.definition = {
    config: {
        columns: {
            IdAlumnoAsignatura: "int",
            Alumno: "int",
            Asignatura: "int",
            FechaInicio: "date"
        },
        adapter: {
            type: "sql",
            collection_name: "AlumnoAsignatura",
            db_file: "/AlumnoVirtualDB.sqlite",
            db_name: "AlumnoVirtual",
            idAttribute: "IdAlumnoAsignatura",
            remoteBackup: "true"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Alumno_Asignatura", exports.definition, []);

collection = Alloy.C("Alumno_Asignatura", exports.definition, model);

exports.Model = model;

exports.Collection = collection;