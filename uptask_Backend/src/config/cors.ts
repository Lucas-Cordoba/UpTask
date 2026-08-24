import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function(origin, callback){
        const whitelist = [process.env.FRONTEND_URL]
        if(whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}

//define la configuración de CORS (Cross-Origin Resource Sharing) para un servidor Express en Node.js, restringiendo qué dominios tienen permiso para realizar peticiones a tu API.
