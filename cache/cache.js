const cache = {

    inicio:"",

    cacheStartPoint:(startPoint)=>{
        if(startPoint){
            cache.inicio = startPoint
        }else{
            const start = cache.inicio
            return start
        }
        
    },

    borrarCache:()=>{
        cache.inicio = ""
    }
}
module.exports = cache;