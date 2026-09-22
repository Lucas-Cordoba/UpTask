import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, "");

        const whitelist = [
            frontendUrl,
            "http://localhost:5173",
            "http://localhost:3000"
        ];

        // Si usas el parámetro --api en la consola
        if (process.argv[2] === '--api') {
            whitelist.push(undefined);
        }

        // 1. Permite llamadas sin origin (Postman, scripts o --api)
        // 2. Permite orígenes en la whitelist
        // 3. Permite cualquier vista previa desplegada en Vercel (*.vercel.app)
        const isAllowedVercel = origin?.endsWith('.vercel.app');

        if (!origin || whitelist.includes(origin) || isAllowedVercel) {
            callback(null, true);
        } else {
            // Pasar false en lugar de lanzar un Error evita el fallo HTTP 500 en preflight
            callback(null, false);
        }
    }
};