const db = require('../config/db')

const userModel = {

    addUser:(newUser,callback)=>{
        const query = "INSERT INTO usuarios SET ?"
        db.query(query,newUser,(err)=>{
            if(err){
                return callback(err);   
            }
            return callback(null)
        })
    },
    verifyUser:(user,callback)=>{
        const query = "SELECT correo FROM usuarios WHERE correo = ?";
        db.query(query,user,(err,results)=>{
            if(err){
                return callback(err,null)
            }
            return callback(null,results)
        })

    }
}

module.exports = userModel;