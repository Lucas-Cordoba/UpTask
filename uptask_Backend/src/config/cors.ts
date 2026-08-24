import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        const whitelist = [process.env.FRONTEND_URL];

        // Muestra en consola qué origen intenta conectarse (útil para depurar)
        // console.log("Origen entrante:", origin);

        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    }
};