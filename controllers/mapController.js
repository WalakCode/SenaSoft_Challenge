const { json } = require('body-parser');
const model = require('../models/mapModel');

const mapController={
    addNodeJson:(jsonObject,callback)=>{
        const ubicaciones = jsonObject.ubicaciones
        ubicaciones.forEach(i => {
           model.addNodeJson(i,(err)=>{
            if(err){
                return callback(err)
            }
           })

        });
    },

    addConexionJson:(jsonObject,callback)=>{
        const conexiones = jsonObject.conexiones
        conexiones.forEach(i => {
            model.addConexionJson(i,(err)=>{
                if(err){
                    return callback(err)
                }
            })
        });
    }
}

module.exports = mapController