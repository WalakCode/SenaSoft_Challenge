// Requiere el módulo 'mapModel' ubicado en el directorio '../models'
const model = require("../models/mapModel");

// Define un objeto 'mapController' para agrupar funciones relacionadas con el controlador de mapas
const mapController = {
  addNodeJson: (jsonObject, callback) => {
    // Extrae la propiedad 'ubicaciones' del objeto JSON
    const ubicaciones = jsonObject.ubicaciones;

    ubicaciones.forEach((i) => {
      const nombre = i.nombre;
      model.viewNodes(nombre, (err, results) => {
        if (err) {
          return callback(err);
        }
        if (results.length === 0) {
          model.viewPosicions((err, results) => {
            if (err) {
              return callback(err);
            }
            if (results) {
              const positionsX = [];
              const positionsY = [];
              results.forEach((j) => {
                positionsX.push(j.posX.toString());
                positionsY.push(j.posY.toString());
              });
              if (positionsX.includes(i.posX) && positionsY.includes(i.posY)) {
                let error = "ya existe un nodo en esa posicion"
                return callback(error);
              } else {
                model.addNodeJson(i, (err) => {
                  if (err) {
                    return callback(err);
                  }
                });
              }
            }
          });
          return callback()
        }else{
            let error = "ya existe el nodo"
            return callback(error)
        }
      });
    });
  },

  // Definición de la función 'addConexionJson' que acepta un objeto JSON y un callback como argumentos
  addConexionJson: (jsonObject, callback) => {
    const conexiones = jsonObject.conexiones;
    conexiones.forEach((i) => {
      const ubicaciones = {
        ubicacion1: i.ubicacion1,
        ubicacion2: i.ubicacion2,
      };
      model.viewConexion(ubicaciones, (err, results) => {
        if (err) {
          return callback(err);
        } else {
          if (results.length === 0) {
            model.viewAllNodes((err,results)=>{
                if(err){
                    console.log(err)
                }
                if(results){
                    const nodos = []
                    results.forEach(j => {
                        nodos.push(j.nombre)
                    });
                    if(nodos.includes(i.ubicacion1)||nodos.includes(i.ubicacion2)){
                        model.addConexionJson(i, (err) => {
                            if (err) {
                              return callback(err);
                            }
                          });
                    }else{
                        let error = "no existen los nodos a conectar"
                        return callback(error)
                    }
                }
            })
            return callback()
          }else{
            let error = "ya existe la conexion"
            return callback(error)
          }
        }
      });
    });
  },
};

// Exporta el objecto 'mapController'
module.exports = mapController;
