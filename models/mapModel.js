const { callbackify } = require('util');
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
    }

}

module.exports = userModel;