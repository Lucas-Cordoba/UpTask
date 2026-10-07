import { getResendInstance } from '../config/resend'

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        try {
            const resend = getResendInstance()
            const data = await resend.emails.send({
                from: 'UpTask <onboarding@resend.dev>',
                to: user.email,
                subject: 'UpTask - Confirma tu cuenta',
                html: `<p>Hola: ${user.name}, has creado tu cuenta en UpTask, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
                    <p>Visita el siguiente enlace: </p>
                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar Cuenta</a>
                    <p>E ingresa el codigo: <b>${user.token}</b> </p>`
            })
            console.log('Mensaje enviado con Resend:', data)
        } catch (error) {
            console.error('Error al enviar correo:', error)
        }
    }

    static sendPasswordResetToken = async (user: IEmail) => {
        try {
            const resend = getResendInstance()
            const data = await resend.emails.send({
                from: 'UpTask <onboarding@resend.dev>',
                to: user.email,
                subject: 'UpTask - Restablecer contraseña',
                html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password</p>
                    <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer Contraseña</a>
                    <p>E ingresa el codigo: <b>${user.token}</b> </p>`
            })
            console.log('Mensaje de recuperación enviado con Resend:', data)
        } catch (error) {
            console.error('Error al enviar correo:', error)
        }
    }
}