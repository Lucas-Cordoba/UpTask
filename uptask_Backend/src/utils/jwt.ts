import jwt from 'jsonwebtoken';
import {Types} from 'mongoose';
type UserPayload = {
    id: Types.ObjectId;
}
export const generateJWT = (payload: UserPayload) => { //el payload es el objeto que vamos a guardar en el token, en este caso el id del usuario que lo enviamos desde el controlador

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d' //tiempo de validez de nuestro token
    }) //.sign es para generar el token
    return token

}
