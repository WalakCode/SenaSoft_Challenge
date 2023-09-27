const model = require('../models/cartModel')

const cartController = {
    setData:(callback)=>{
        model.getLocations((err,results)=>{
            if(err){
            }
            if(results){
                return callback(results)
            }
        });

    } 


}

module.exports = cartController;