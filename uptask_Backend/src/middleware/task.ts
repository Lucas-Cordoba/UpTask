//Este Middleware lo que hace es verificar que exista el proyecto

import type { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/Task'

//con esto De manera global le agregamos el atributo project a Request y de esta manera podemos usarlo en todoos lso controladores
declare global {
    namespace Express {
        interface Request {
            task: ITask //esto lo que hace es agregarle al Request un atributo nuevo y se le debe indicar a que type pertenece
        }
    }
}
export async function taskExists(req: Request, res: Response, next: NextFunction) {


    try {
        const { taskId } = req.params
        const task = await Task.findById(taskId)

        if (!task) {
            const error = new Error('Tarea No encontrada')
            return res.status(400).json({ error: error.message })
        } //revisa si el proyecto existe
        req.task = task
        next()
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' })
    }


}

export function taskBelongToProject(req: Request, res: Response, next: NextFunction) {
    if (req.task.project.toString() !== req.project._id.toString()) {  //poner toString porque es un objectId y esta verificacion la para tareas que no pertenezcan a un proyecto
        const error = new Error('Accion no válida')
        return res.status(404).json({ error: error.message })
    }
    next()
}