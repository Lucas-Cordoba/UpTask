import type { Request, Response} from 'express'
import Note, {INote} from '../models/Note'
import { Types } from 'mongoose'
import { resolveTlsa } from 'node:dns'

type NoteParams = {
    noteId: Types.ObjectId,
}
export class NoteController{
    static createNote = async (req: Request<{},{},INote>, res: Response) => {
        const {content} =req.body //de INote ya viene el tipo de content que es string

        const note = new Note() //se instancia
        note.content = content  //se agrega el contenido al contenido en notas
        note.createdBy = req.user._id //se agrega el id del usuario que la creo
        note.task = req.task._id    //se agrega el id de la tarea

        req.task.notes.push(note._id) //se agrega el id de la note en el campo de notas en tareas


        try {
            await Promise.allSettled([req.task.save(),note.save()])
            res.send('Nota Creada Correctamente')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }


    static getTaskNotes = async (req: Request, res: Response) => {
        try {
            const notes = await Note.find({task: req.task._id})
            res.json(notes)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {
        const { noteId } =req.params
        const note = await Note.findById(noteId)

        if(!note) {
            const error = new Error('Nota no encontrada')
            return res.status(404).json({error: error.message})
        }

        if(note.createdBy.toString() !== req.user._id.toString()){
            const error = new Error('Solo el manager puede eliminar')
            return res.status(401).json({error: error.message})
        }
        req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString())
        try {
            await Promise.allSettled([req.task.save(), note.deleteOne()])
            res.send('La Nota se elimino correctamente')
        } catch (error) {
            return res.status(500).json({error: 'Hubo un error'})
        }
    }
}

//Request<{},{},{}> Cada una de las llaves vacías {} dentro de los paréntesis angulares representa un objeto sin propiedades personalizadas específicas
//el primer {} param directory es para especificar el tipó de datos, el segundo se conoce como res body, el tercero es request body
//si nos paramos sobre Request con esas tres llaves nos aparece ReqQuery que se le pasa el parametro para una query