import type { Request, Response } from 'express'
import Task from '../models/Task'
import { validateProjectExists } from '../middleware/project'
export class TaskController {

    static createTask = async (req: Request, res: Response) => {


        try {
            const task = new Task(req.body)
            //De manera global le agregamos el atributo project a Request y de esta manera podemos usarlo en todoos lso controladores
            task.project = req.project._id //le asignamos el id del proyecto a esta tarea
            req.project.tasks.push(task._id) //Le agregamos cada id de cada tarea al proyecto que pertencen esas tareas, push es un metodo para ir agregando en un arreglo


            // await task.save()
            // await req.project.save()  //esto se puede hacer de poner doble await cuando una tarea depende de otra por ejemplo para confirmar el pedido primero debe estar el pago

            await Promise.allSettled([task.save(), req.project.save()]) //se ponen los dos aca para usar un await y mejorar el performance, y este Promise se encarga de que se ejecuten las dos
            res.send('Tarea Creada correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }


    static getProjectTasks = async (req: Request, res: Response) => {


        try {
            
            const tasks = await Task.find({project: req.project._id}).populate('project') //poniendo populate y entre parentesis la referencia lo que hace esto es mostrar la info del proyecto
            res.json(tasks)

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


}//este se va a mandar a llamar desde router
