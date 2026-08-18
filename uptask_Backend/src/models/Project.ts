import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose"; //PopulateDoc es una forma de traernos la referencia en este caso de la tarea
import { ITask } from "./Task";

export interface IProject extends Document //se pone Type para que no haya dos variables llamadas iguales
{
    projectName: string,
    clientName: string,
    description: string,
    tasks: PopulatedDoc<ITask & Document>[] //Se pone [] porque va a haber multiples tareas
} //este es el esquema de TypeScript

const ProjectSchema: Schema = new Schema ({
    projectName: {
        type: String,
        required: true,  //esto dice que es obligatorio
        trim: true, //si pone espacios al principio o final los corta
        // unique:true //garantiza que sea unico
    },
    clientName: {
        type: String,
        required: true,  //esto dice que es obligatorio,
        trim: true, //si pone espacios al principio o final los corta
        // unique:true //garantiza que sea unico
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [ //se ponen corchetes para decirle que va a ser un arreglo
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ]
},{timestamps: true}) //este ,{timestamps: true} almacena cuando se creo el registro y cuando lo actualizamos


const Project = mongoose.model<IProject>('Project', ProjectSchema) //De esta manera agregamos este modelo a la instancia de mongoose
//ese modelo de Mongoose hace referencia al ProjectType
export default Project