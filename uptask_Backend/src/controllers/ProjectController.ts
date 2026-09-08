import type { Request, Response } from 'express'
import Project from '../models/Project'
import { error } from 'node:console'

export class ProjectController { //este se va a mandar a llamar desde router


    static createProject = async (req: Request, res: Response) => {


        const project = new Project(req.body) //con esto lo instanciamos

        // Asigna un manager
        project.manager = req.user?._id //esto es para que el manager sea el usuario que esta logueado, y se le asigna el id del usuario que esta logueado, y se le asigna al proyecto que se esta creando
        try {

            await project.save()

            // await Project.create(req.body) otra forma de crear un registro/Document
            res.send('Proyecto Creado Correctamente')

        } catch (error) {
            console.log(error.message)
        }
    }
    static getAllProjects = async (req: Request, res: Response) => {

        try {
            const projects = await Project.find({
                $or: [
                    { manager: {$in: req.user?._id}}
                ]
            }) //Esa consulta de Mongoose busca en la base de datos todos los proyectos donde el usuario autenticado sea el manager, $or: [...]: Permite hacer multiples condiciones, $in comprueba que el ID del usuario coincida o esté contenido en ella.
            //manager: { $in: req.user?._id }: Filtra los registros comparando el campo manager
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }
    static getProjectById = async (req: Request, res: Response) => {

        const { id } = req.params
        try {
            const project = await Project.findById(id).populate('tasks')

            if (!project) {
                const error = new Error('Proyecto No encontrado')
                return res.status(400).json({ error: error.message })
            }

            if(project.manager.toString() !== req.user?._id.toString()){ //esto es para que solo el manager pueda ver el proyecto, y no cualquier usuario que tenga el id del proyecto
           
                const error = new Error('Acción no valida, acceso denegado')
                return res.status(404).json({ error: error.message })
            } //esto lo que hace es que si el manager del proyecto no es el mismo que el usuario que esta logueado, entonces no se puede ver el proyecto, y se le envia un mensaje de error
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }
    static updateProject = async (req: Request, res: Response) => {

        const { id } = req.params
        try {
            const project = await Project.findById(id) //toma dos parametros uno el id, y tambien lo que enviamos por formulario


            if (!project) {
                const error = new Error('Proyecto No encontrado')
                return res.status(400).json({ error: error.message })
            }

            if(project.manager.toString() !== req.user?._id.toString()){ //esto es para que solo el manager pueda ver el proyecto, y no cualquier usuario que tenga el id del proyecto
           
                const error = new Error('Solo el manager puede actualizar el proyecto, acceso denegado')
                return res.status(404).json({ error: error.message })
            } //verifica que el manager del proyecto sea el mismo que el usuario que esta logueado, y si no es asi entonces no se puede actualizar el proyecto


            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            await project.save()
            res.send('Proyecto Actualizado')



        } catch (error) {
            console.log(error)
        }
    }
    static deleteProject = async (req: Request, res: Response) => {

        const { id } = req.params
        try {
            // const project = await Project.findByIdAndDelete(id) // una forma de hacerlo,las funciones findByIdAndDelete y demas ya las realiza

            const project = await Project.findById(id)

            await project.deleteOne() //otra forma

            if (!project) {
                const error = new Error('Proyecto No encontrado')
                return res.status(400).json({ error: error.message })
            }

            if(project.manager.toString() !== req.user?._id.toString()){ //esto es para que solo el manager pueda ver el proyecto, y no cualquier usuario que tenga el id del proyecto
           
                const error = new Error('Solo el manager puede eliminar el proyecto, acceso denegado')
                return res.status(404).json({ error: error.message })
            } //verifica que el manager del proyecto sea el mismo que el usuario que esta logueado, y si no es asi entonces no se puede eliminar el proyecto
            res.send('Proyecto Eliminado')



        } catch (error) {
            console.log(error)
        }
    }



}

