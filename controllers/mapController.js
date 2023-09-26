const { json } = require('body-parser');
const model = require('../models/mapModel');

const mapController={
    addNodeJson:(jsonObject,callback)=>{
        const ubicaciones = jsonObject.ubicaciones
        ubicaciones.forEach(i => {
           const nombre = i.nombre
           model.viewNodes(nombre,(err,results)=>{
            console.log(results)
            if(err){
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

module.exports = mapController