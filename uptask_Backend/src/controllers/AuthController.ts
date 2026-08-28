import { Response, Request } from "express"
import { checkPassword, hashPassword } from '../utils/auth'
import User from "../models/Auth"
import Token from "../models/Token"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"
import { check } from "express-validator"


export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {




            const { password, email } = req.body
            //Prevenir duplicados
            const userExists = await User.findOne({ email }) //realiza una búsqueda en la base de datos de MongoDB (a través de Mongoose) para comprobar si ya existe un registro guardado con ese correo electrónico.
            if (userExists) {
                const error = new Error('El Usuario ya esta registrado')
                return res.status(409).json({ error: error.message })
            }

            const user = new User(req.body) //se instancia un nuevo usuario


            // HASHEAR PASSWORD
            user.password = await hashPassword(password)

            //Generar el token
            const token = new Token()
            token.token = generateToken()
            token.user = user._id

            //Enviar el email de confirmacion
            AuthEmail.sendConfirmationEmail({
                email: user.email, //le pasamos el email por parametro
                name: user.name,
                token: token.token
            })
            //Crear el usuario
            // await user.save()//se guarda el usuario
            // await token.save() //guarda el token generado
            await Promise.allSettled([user.save(), token.save()])
            res.send('Cuenta creada, revisa tu email para confirmarla') //respuesta al usuario 



        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body

            const tokenExists = await Token.findOne({ token }) //si no existe retorna null y si existe retorna el objeto completo
            if (!tokenExists) {
                const error = new Error('Token no válido')
                return res.status(404).json({ error: error.message })
            }

            const user = await User.findById(tokenExists.user)
            user.confirmed = true

            await Promise.allSettled([
                user.save(), tokenExists.deleteOne()//borra el token y guarda el usuario con el cambio en confirmed
            ])

            res.send('Cuenta confirmada correctamente')
        } catch {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }



    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({ error: error.message })
            }

            if(!user.confirmed){
                //Se genera un nuevo token
                const token = new Token()
                token.user= user._id
                token.token = generateToken()
                await token.save()

                //Se envia el email
                AuthEmail.sendConfirmationEmail({
                email: user.email, //le pasamos el email por parametro
                name: user.name,
                token: token.token
            })
                const error = new Error('La cuenta no ha sido confirmada, hemos enviado un e-mail de confirmacion a tu correo')
                return res.status(401).json({ error: error.message })
            
            }

            
            //revisar el Password
            const isPasswordCorrect = await checkPassword(password, user.password) //revisa el passowrd ingresado con el password hasheado

            if(!isPasswordCorrect){
                const error = new Error('Password Incorrecto')
                return res.status(401).json({ error: error.message })
            }

            res.send('Autenticando...') //lo vamos a autenticar en produccion
        } catch {
            res.status(500).json({ error: 'Hubo un error' })
        }


    }

}