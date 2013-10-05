exports.definition = {
    config: {
        columns: {
            IdAsignatura: "int",
            Nombre: "string",
            Descripcion: "string",
            Optativa: "boolean",
            Curso: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "Asignatura",
            db_file: "/AlumnoVirtualDB.sqlite",
            db_name: "AlumnoVirtual",
            idAttribute: "IdAsignatura",
            remoteBackup: "true"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            updateFavorito: function(idAsignatura, favorito) {
                try {
                    var query1 = "UPDATE ASIGNATURA SET FAVORITA = " + favorito + " WHERE IdAsignatura= " + idAsignatura;
                    this.fetch({
                        query: query1
                    });
                } catch (err) {}
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("Asignatura", exports.definition, []);

collection = Alloy.C("Asignatura", exports.definition, model);

exports.Model = model;

exports.Collection = collection;