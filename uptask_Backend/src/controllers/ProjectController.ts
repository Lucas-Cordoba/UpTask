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
                    { manager: {$in: req.user?._id}},
                    {team: {$in: [req.user._id]}}
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

            if(project.manager.toString() !== req.user?._id.toString() && !project.team.includes(req.user._id)){ //esto es para que solo el manager pueda ver el proyecto, y no cualquier usuario que tenga el id del proyecto
                //!project.team.includes(req.user._id)verifica si el usuario autenticado NO forma parte del equipo (team) del proyecto.entonces no ejecuta este if
                const error = new Error('Acción no valida, acceso denegado')
                return res.status(404).json({ error: error.message })
            } //esto lo que hace es que si el manager del proyecto no es el mismo que el usuario que esta logueado, entonces no se puede ver el proyecto, y se le envia un mensaje de error
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }
    static updateProject = async (req: Request, res: Response) => {

        try {
          

            req.project.projectName = req.body.projectName
            req.project.clientName = req.body.clientName
            req.project.description = req.body.description
            await req.project.save()
            res.send('Proyecto Actualizado')



        } catch (error) {
            console.log(error)
        }
    }
    static deleteProject = async (req: Request, res: Response) => {

        
        try {
            await req.project.deleteOne() //otra forma
            res.send('Proyecto Eliminado')



        } catch (error) {
            console.log(error)
        }
    }



}

