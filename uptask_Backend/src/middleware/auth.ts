//esto es para que cuando se haga un request a la ruta de project, se ejecute la funcion authenticate y si pasa eso entonces se van a mostrar los proyectos, si no pasa eso entonces no se van a mostrar los proyectos
import { Request, Response, NextFunction } from 'express';
import  jwt  from 'jsonwebtoken';
import User, { IUser } from '../models/Auth';

declare global{
    namespace Express {
        interface Request {
            user?: IUser //esto es para que cuando se haga un request a la ruta de project, se ejecute la funcion authenticate y si pasa eso entonces se van a mostrar los proyectos, si no pasa eso entonces no se van a mostrar los proyectos
        }
    }
}
export const authenticate= async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
    if(!bearer){
        const error  = new Error('No autorizado')
        return res.status(401).json({msg: error.message})
    } //el que entre a una pagina que no este autorizado le va a aparecer este mensaje
    
    const [, token] = bearer.split(' ') //el token es el segundo elemento del array que se crea al hacer split, el primer elemento es Bearer y el segundo es el token
    // const [token] = bearer.split(' ')[1] puede ser asi tambien pero es mas facil de leer asi 
    
    
    try {
        //Se verifica que el token sea valido y se decodifica
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //verifica que el token sea valido y lo decodifica, tambien se debe enviar la clave secreta que se utilizo para crear el token
        
        //Se verifica que el usuario exista y se busca el usuario en la base de datos por el id que se encuentra en el token
        if(typeof decoded === 'object' && decoded.id) {

            const user = await User.findById(decoded.id).select('_id name email') //busca el usuario en la base de datos por el id que se encuentra en el token
            //con el select se selecciona que campos se quieren traer del usuario, para evitar traer informacion sensible como la contraseña
            if(user){
                req.user = user //si el usuario existe entonces se guarda en la request para que se pueda usar en el controlador
            }else{
                res.status(500).json({error: 'Token no valido'})
            }
        }



    } catch (error) {
        res.status(500).json({error: 'Token no valido'})
    }
    
    
    
    
    
    
    
    
    
    
    next()
}


/* En una peticion HTTP viene la informacion de la
/url
el tipos de request: POST, GET, PUT, DELETE
Headers: informacion de la peticion, por ejemplo el token
body: informacion que se envia en la peticion, por ejemplo el nombre de un proyecto
*/