const model = require('../models/cartModel')

const cartController = {
    setLocationData:(callback)=>{
        model.getLocations((err,results)=>{
            if(err){
                console.log(err)
            }
            if(results){
                const ubiArr = []
 
                results.forEach(i => {
                    let ubiOb = {}
                    ubiOb.nombre = i.nombre
                    ubiOb.posX = i.posX
                    ubiOb.posY = i.posY
                    ubiArr.push(ubiOb)
                });
                return callback(ubiArr)
            }
        });

    },
    setConecctionData:(callback)=>{
        model.getConnection((err,results)=>{
            if(err){
            }
            if(results){
                return callback(results)
            }
        });

    } 


}

module.exports = cartController;