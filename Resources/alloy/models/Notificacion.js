exports.definition = {
    config: {
        columns: {
            IdNotificacion: "bigint",
            Tipo: "int",
            Titulo: "string",
            Texto: "string",
            Alumno: "int",
            Asignatura: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "Notificacion",
            db_file: "/AlumnoVirtualDB.sqlite",
            db_name: "AlumnoVirtual",
            idAttribute: "IdNotificacion",
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

model = Alloy.M("Notificacion", exports.definition, []);

collection = Alloy.C("Notificacion", exports.definition, model);

exports.Model = model;

exports.Collection = collection;