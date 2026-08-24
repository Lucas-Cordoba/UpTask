import type { Request, Response } from 'express'
import Project from '../models/Project'
import { error } from 'node:console'

export class ProjectController { //este se va a mandar a llamar desde router


    static createProject = async (req: Request, res: Response) => {

        if (true) {
            const error = new Error('Proyecto No encontrado')
            return res.status(400).json({ error: error.message })
        }


        const project = new Project(req.body) //con esto lo instanciamos

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
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }
    static getAllProjectById = async (req: Request, res: Response) => {

        const { id } = req.params
        try {
            const project = await (await Project.findById(id)).populate('tasks')

            if (!project) {
                const error = new Error('Proyecto No encontrado')
                return res.status(400).json({ error: error.message })
            }
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


            project.clientName = req.body.clientName
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

            res.send('Proyecto Eliminado')



        } catch (error) {
            console.log(error)
        }
    }



}

