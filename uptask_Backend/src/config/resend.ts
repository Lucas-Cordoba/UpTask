import { Resend } from 'resend'

// Creamos un export seguro que lee la clave al momento de instanciar
export const getResendInstance = () => {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
        throw new Error('Falta la RESEND_API_KEY en las variables de entorno')
    }
    return new Resend(apiKey)
}