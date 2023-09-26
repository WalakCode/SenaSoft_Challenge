const model = require('../models/userModel');//pidiendo el modelo de usuario

//controlador de usuario
const userController = {
  
    registerUser:(email,password,callback) =>{
        const newUser ={ 
            correo: email,
            contraseña: password, 
        };
        model.addUser(newUser,(err) =>{
            if(err){
              return callback(err);
            }
            return callback(null)

        })  
    },

    verifyUser:(email,password,callback)=>{
      if(email && password){
        model.verifyUser(email,(err,results)=>{
          if(err){
            return(callback(err,null))
          }
          if(results.length !== 0){
            let error = 'usuario ya existe en la base de datos'
            return callback(null,error)
          }else{
            return callback(null,null)
          }
        })
      }else{
        let error = 'ingrese todos los datos'
        return callback(null,error)
      }
    },


    sessionStart: (email, password, callback) => {
        model.verifyUser(email,(err, results) => {
          if (err) {
            console.error('Error en la consulta de usuario por nombre:', err);
            return callback(err,null);
          }
          if (results.length === 0) {
            let error = "usuario no encontrado";
            return callback(null, false,error); 
          }
          const userFound = results[0];
          const passStorage = userFound.contraseña;

          if (passStorage === password) {
            return callback(null, true); 
          } else {
            let error = "no coincide contraseñas";
            return callback(null,false,error);
            }
        });
      },
  
}

//exporta el modulo
module.exports = userController;
