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
    verifyUser:(email,callback)=>{
        const query = 'SELECT * FROM usuarios WHERE correo = ?';
        db.query(query,email,(err,results)=>{
            if(err){
                console.log(err)
                return callback(err,null)
            }
            return callback(null,results);
        })
    }
 }

module.exports = userModel;