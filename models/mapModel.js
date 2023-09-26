const db = require('../config/db');


const userModel = {

    addNodeJson:(jsonObject)=>{
        const query = "INSERT INTO ubicaciones SET ?"
        db.query(query,jsonObject,(err)=>{
            if(err){
                return callback(err);
            }
        })
    },
    

    addConexionJson:(jsonObject)=>{
        const query = "INSERT INTO conexiones SET ?"
        db.query(query,jsonObject,(err)=>{
            if(err){
                return callback(err);
            }
        })
        
    },
    
    viewNodes:(nombre,callback)=>{
        const query = "SELECT * FROM ubicaciones WHERE nombre = ?";
        db.query(query,nombre,(err,results)=>{
            if(err){
                return callback(err,null)
            }
            if(results){
                return callback(null,results)
            }
        })
             
    },

    viewConexion:(ubicaciones,callback)=>{
        const ubicacion1 = ubicaciones.ubicacion1
        const ubicacion2 = ubicaciones.ubicacion2
        const query = "SELECT * FROM conexiones WHERE ubicacion1 = ? AND ubicacion2 = ?";
        db.query(query,[ubicacion1,ubicacion2],(err,results)=>{
            if(err){
                console.log(err)
                return callback(err,null)
            }
            if(results){
                return callback(null,results)
            }
        })
    },
}
module.exports = userModel;