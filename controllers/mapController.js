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
    }
}

module.exports = mapController