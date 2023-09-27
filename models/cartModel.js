const db = require('../config/db');

const cartModel = {

    getLocations:(callback)=>{
        const query = "SELECT nombre,posX,posY FROM ubicaciones"
        db.query(query,(err,results)=>{
            if(err){
                return callback(err,null)
            }
            if(results){
                return callback(null,results)
            }
        })
    },
    
    getConnection:(callback)=>{
        const query = "SELECT * FROM conexiones"
        db.query(query,(err,results)=>{
            if(err){
                return callback(err,null)
            }
            if(results){
                return callback(null,results)
            }
        })
    },
}

module.exports = cartModel;