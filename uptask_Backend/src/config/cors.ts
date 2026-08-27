import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {

        const whitelist = [process.env.FRONTEND_URL];
        // console.log(process.argv) //serie de parametros que pasamos cuando se ejecuta este programa o aplicacion 
        if (process.argv[2] === '--api') { //vemos si el parametro que se pasa es api
            whitelist.push(undefined)
        } //debo ejecutar el servidor con npm run dev:api para no tener error de cors
        // Muestra en consola qué origen intenta conectarse (útil para depurar)
        // console.log("Origen entrante:", origin);

        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    }
};