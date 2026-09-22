import type { Request, Response } from 'express'
import User from '../models/Auth'
import Project from '../models/Project'

export class TeamMemberController {

    static async findTeamMemberByEmail(req: Request, res: Response) {
        const { email } = req.body


        //Find user 
        const user = await User.findOne({ email }).select('id email name')//esto lo que hace es buscar en la base de datos un usuario que tenga el email que le pasamos por body
        //el select es para que nos devuelva solo el id, email y name del usuario

        if (!user) {
            const error = new Error('Usuario no encontrado')
            return res.status(404).json({ error: error.message })
        }

        res.json(user) //si lo encuentra nos devuelve el usuario
    }

    static async getProjectTeam(req: Request, res: Response) {
        const project = await Project.findById(req.project._id).populate({
            path:'team',
            select: 'id email name'
        }) //esto lo que hace es traer el proyecto con el id que le pasamos por params y nos trae el arreglo de team del proyecto, y con populate lo que hacemos es traer la referencia de los usuarios que estan en el arreglo de team, y con 'id name email' le decimos que solo nos traiga el id, name y email de los usuarios solamente

        res.json(project.team) //esto lo que hace es devolver el arreglo de team del proyecto
    }


    static async addMemberById(req: Request, res: Response) {
        const { id } = req.body

        const user = await User.findById(id).select('id')
        if (!user) {
            const error = new Error('Usuario no encontrado')
            return res.status(404).json({ error: error.message })
        }

        if(req.project.team.some(team => team.toString() === user._id.toString())) {
            const error = new Error('El Usuario ya existe en el proyecto')
            return res.status(409).json({ error: error.message })
        }
        req.project.team.push(user._id) //esto lo que hace es agregar el id del usuario al arreglo de team del proyecto
        await req.project.save() //esto lo que hace es guardar el proyecto con el nuevo miembro agregado al team

        res.send('Usuario agregado correctamente') 
    }

    static async removeMemberById(req: Request, res: Response) {
        const { userId } = req.params

        if(!req.project.team.some(team => team.toString() === userId)) { //esto lo que hace es verificar si el id del usuario que queremos eliminar existe en el arreglo de team del proyecto
            //some es para verificar si existe un elemento en un arreglo que cumpla con una condición, en este caso si el id del usuario que queremos eliminar no existe en el arreglo de team del proyecto
            const error = new Error('El Usuario no existe en el proyecto')
            return res.status(409).json({ error: error.message })
        }

        req.project.team = req.project.team.filter(teamMember => teamMember.toString() !== userId) //esto lo que hace es filtrar el arreglo de team del proyecto y eliminar el id del usuario que queremos eliminar
        await req.project.save()
        res.send('Usuario eliminado correctamente') 
    }
}