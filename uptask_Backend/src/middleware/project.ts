//Este Middleware lo que hace es verificar que exista el proyecto

import type {Request, Response, NextFunction} from 'express'
import Project, { IProject } from '../models/Project'

//con esto De manera global le agregamos el atributo project a Request y de esta manera podemos usarlo en todoos lso controladores
declare global {
    namespace Express{
        interface Request{
            project: IProject //esto lo que hace es agregarle al Request un atributo nuevo y se le debe indicar a que type pertenece
        }
    }
}
export async function validateProjectExists(req:Request, res:Response, next: NextFunction) {
    

    try {
        const { projectId } = req.params
        const project = await Project.findById(projectId)

        if (!project) {
            const error = new Error('Proyecto No encontrado')
            return res.status(400).json({ error: error.message })
        } //revisa si el proyecto existe
        req.project = project
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }   

    
}