import mongoose, {Schema, Document, Types} from "mongoose";

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completes'
} as const //este es un objeto con los estados de las tareas

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]


export interface ITask extends Document  //se pone Type para que no haya dos variables llamadas iguales
{
    name: string,
    description: string
    project: Types.ObjectId //Con esto lo que hacemos es que cada tarea tiene un proyecto y su tipo de relacion va a ser un Object.ID
    status: TaskStatus
} //este es el esquema de TypeScript

export const TaskSchema: Schema = new Schema ({
    name: {
        type: String,
        required: true,  //esto dice que es obligatorio
        trim: true, //si pone espacios al principio o final los corta
        // unique:true //garantiza que sea unico
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: Types.ObjectId, //aca se va a almacenar la referencia del proyecto, se debe crear una referencia tambien en project
        ref: 'Project' //le pasamos la referencia de donde va a encontrar el resto de la info de esa tarea
    },
    status: {
        type: String,
        enum: Object.values(taskStatus), // se puede poner solo taskStatus, Un enum (enumeración) en TypeScript se utiliza para definir un conjunto de constantes con nombre, lo que permite agrupar valores relacionados y darles una etiqueta más clara e intencional.
        default: taskStatus.PENDING //el default de cada tarea creada
    }
},{timestamps: true}) //este es el esquema de mongoose

//TypeScript detecta los subdocumentos como si fueran arreglos 

const Task = mongoose.model<ITask>('Task', TaskSchema) //De esta manera agregamos este modelo a la instancia de mongoose
//ese modelo de Mongoose hace referencia al ProjectType
export default Task