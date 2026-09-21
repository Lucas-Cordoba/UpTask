import mongoose, { Schema, Document, Types } from "mongoose";
import Note from "./Note";

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const //este es un objeto con los estados de las tareas

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]


export interface ITask extends Document  //se pone Type para que no haya dos variables llamadas iguales
{
    name: string,
    description: string
    project: Types.ObjectId //Con esto lo que hacemos es que cada tarea tiene un proyecto y su tipo de relacion va a ser un Object.ID
    status: TaskStatus
    completedBy: {
        user: Types.ObjectId,
        status: TaskStatus
    }[] //se pone asi porque el completedBy va a almacenar el usuario y el estado de la tarea
    notes: Types.ObjectId[] //va a ser una arreglo porque vamos a tener un arreglo de notas
} //este es el esquema de TypeScript

export const TaskSchema: Schema = new Schema({
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
    },
    completedBy: [{ //agregamos un historial de quien fue actualizando
        user: {
            type: Types.ObjectId,
            ref: 'User',
            default: null
        },
        status: {
            type: String,
            enum: Object.values(taskStatus),
            default: taskStatus.PENDING
    }}],
    notes:[
        {
            type: Types.ObjectId,
            ref: 'Note'
        }
    ]

}, { timestamps: true }) //este es el esquema de mongoose

//Middleware(Ver middleware disponibles en la documentacion de mongoose)
//define un middleware o hook de tipo "pre" sobre el modelo de TaskSchema para el evento deleteOne
//document: true: Le indica a Mongoose que este hook debe ejecutarse como Document Middleware. De esta manera, dentro de la función, this es el documento de Mongoose que se va a eliminar (lo que te permite acceder a sus propiedades como this._id, this.title, etc.).
// query: false: Le indica a Mongoose que no ejecute este hook cuando la eliminación se haga mediante una consulta directa (Task.deleteOne({ ... })).
TaskSchema.pre('deleteOne', {document: true},async function(){
    const taskId= this._id
    if(!taskId) return 
    await Note.deleteMany({task: taskId})
    //prepara la eliminación en cascada de sus notas antes de que la tarea sea borrada. cuando se eliminen las tareas se deben eliminar las notas
})

//TypeScript detecta los subdocumentos como si fueran arreglos 

const Task = mongoose.model<ITask>('Task', TaskSchema) //De esta manera agregamos este modelo a la instancia de mongoose
//ese modelo de Mongoose hace referencia al ProjectType
export default Task