// Requiere el módulo 'mapModel' ubicado en el directorio '../models'
const model = require('../models/mapModel');

// Define un objeto 'mapController' para agrupar funciones relacionadas con el controlador de mapas
const mapController={
    addNodeJson:(jsonObject,callback)=>{
        // Extrae la propiedad 'ubicaciones' del objeto JSON
        const ubicaciones = jsonObject.ubicaciones

        ubicaciones.forEach(i => {
           const nombre = i.nombre
           model.viewNodes(nombre,(err,results)=>{
            console.log(results)
            if(err){
                // Si hay un error, llama al callback con el error como argumento y devuelve
                return callback(err)
            }
            if(results.length === 0 ){
                model.addNodeJson(i,(err)=>{
                    if(err){
                        return callback(err)
                    }
                })
            }
           })

        });
    },
    // Definición de la función 'addConexionJson' que acepta un objeto JSON y un callback como argumentos
    addConexionJson:(jsonObject,callback)=>{
        console.log(jsonObject)
        const conexiones = jsonObject.conexiones

        conexiones.forEach(i => {
           const ubicaciones = {ubicacion1:i.ubicacion1,ubicacion2:i.ubicacion2}
           model.viewConexion(ubicaciones,(err,results)=>{
            if(err){
                console.log("errorooro")
            }else{
                if(results.length === 0){
                    model.addConexionJson(i,(err)=>{
                        if(err){
                            return callback(err)
                        }else{
                        }
                    })
                }
                
            }
           }) 
        });
    }
}

// Exporta el objecto 'mapController'
module.exports = mapController