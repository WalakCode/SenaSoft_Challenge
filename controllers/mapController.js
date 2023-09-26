// Requiere el módulo 'mapModel' ubicado en el directorio '../models'
const model = require('../models/mapModel');

// Define un objeto 'mapController' para agrupar funciones relacionadas con el controlador de mapas
const mapController={
    addNodeJson:(jsonObject,callback)=>{
        // Extrae la propiedad 'ubicaciones' del objeto JSON
        const ubicaciones = jsonObject.ubicaciones

        ubicaciones.forEach(i => {
            // Itera a través de cada elemento del arreglo 'ubicaciones'
           model.addNodeJson(i,(err)=>{
            // Llama a la función 'addNodeJson' del modelo 'model' para agregar un nodo

            // Verifica si hay un error en la llamada al modelo
            if(err){
                // Si hay un error, llama al callback con el error como argumento y devuelve
                return callback(err)
            }
           })

        });
    },
    // Definición de la función 'addConexionJson' que acepta un objeto JSON y un callback como argumentos
    addConexionJson:(jsonObject,callback)=>{
        // Extrae la propiedad 'conexiones' del objeto JSON
        const conexiones = jsonObject.conexiones

        conexiones.forEach(i => {
            // Extrae la propiedad 'conexiones' del objeto JSON
            model.addConexionJson(i,(err)=>{
                // Extrae la propiedad 'conexiones' del objeto JSON.


                // Verifica si hay un error en la llamada al modelo.
                if(err){
                // Si hay un error, llama al callback con el error como argumento y devuelve.
                    return callback(err)
                }
            })
        });
    }
}

// Exporta el objecto 'mapController'
module.exports = mapController