//Esto hace que en Express se ejecute la validacion antes que el codgio de inyeccion en la base de datos,
//Funciones que se ejecutan en las peticiones HTTP

//HACERLO PARA QUE RETORNE ALGUN ERROR SI ES QUE LOS HAY
import type {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'


export const handleInputErrors = (req: Request,res: Response,next: NextFunction) => {

    let errors = validationResult(req) //esto sirve para recolectar y verificar si hubieron errores de validación en las peticiones que llegan a tu servidor.

    if(!errors.isEmpty()) { //si esta vacio, osea no hay errores ejecuta este codigo
        return res.status(400).json({errors: errors.array()
        })
    }
    next() //hace que siga con el siguiente middleware
}
