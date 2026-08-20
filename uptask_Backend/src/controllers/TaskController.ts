import type { Request, Response } from 'express'
import Task from '../models/Task'
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
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


    static getProjectTasks = async (req: Request, res: Response) => {


        try {

            const tasks = await Task.find({ project: req.project._id }).populate('project') //poniendo populate y entre parentesis la referencia lo que hace esto es mostrar la info del proyecto
            res.json(tasks)

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getTasksById = async (req: Request, res: Response) => {


        try {

            // const { taskId } = req.params
            // const task = await Task.findById(taskId)

            // if (!task) {
            //     const error = new Error('Tarea no encontrada')
            //     return res.status(404).json({ error: error.message })
            // } esto se pone si no se usa un middlwarea

            if (req.task.project.toString() !== req.project._id.toString()) {  //poner toString porque es un objectId y esta verificacion la para tareas que no pertenezcan a un proyecto
                const error = new Error('Accipon no válida')
                return res.status(404).json({ error: error.message })
            }

            res.json(req.task)


        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


    static updateTask = async (req: Request, res: Response) => {


        try {

            // const { taskId } = req.params
            // const task = await Task.findById(taskId) //const task = await Task.findByIdAndUpdate(taskId, req.body) se puede hacer asi pero lo actualiza en el momento y no espera a ejecutar las validaciones

            // if (!task) {
            //     const error = new Error('Tarea no encontrada')
            //     return res.status(404).json({ error: error.message })
            // }

            if (req.task.project.toString() !== req.project._id.toString()) {  //poner toString porque es un objectId y esta verificacion la para tareas que no pertenezcan a un proyecto
                const error = new Error('Accipon no válida')
                return res.status(404).json({ error: error.message })
            }

            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save() //de esta manera recien despues de todas las validaciones se actualiza
            res.send('La tarea se actualizo correctamente')


        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static deleteTask = async (req: Request, res: Response) => {


        try {

            // const { taskId } = req.params
            // const task = await Task.findById(taskId) //se puede usar tambien const task = await Task.findByIdAndDelete(taskId) el tema que si lo pongo asi se elimina sin pasar por las validaciones de abajo

            // if (!task) {
            //     const error = new Error('Tarea no encontrada')
            //     return res.status(404).json({ error: error.message })
            // }

            req.project.tasks = req.project.tasks.filter(task => req.task.toString() !== req.task._id.toString()) //trae todas las tareas que sean distintan a taskId, se pone .toString porque este comparador es estricto y compara el tipo de datos y valor
            // await task.deleteOne()
            // await req.project.save() solo se pone asi si un await depende del otro 

            await Promise.allSettled([req.task.deleteOne(), req.project.save()])

            res.send('La tarea se elimino correctamente')


        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateStatus = async (req: Request, res: Response) => {


        try {

            // const { taskId } = req.params

            // const task = await Task.findById(taskId) //se puede usar tambien const task = await Task.findByIdAndDelete(taskId) el tema que si lo pongo asi se elimina sin pasar por las validaciones de abajo
            // if (!task) {
            //     const error = new Error('Tarea no encontrada')
            //     return res.status(404).json({ error: error.message })
            // }

            const { status } = req.body
            req.task.status = status

            await req.task.save()

            res.send('El estado se actualizo correctamente')


        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

}//este se va a mandar a llamar desde router
