import mongoose, {Schema, Document, Types} from "mongoose";

export interface ITask extends Document  //se pone Type para que no haya dos variables llamadas iguales
{
    name: string,
    description: string
    project: Types.ObjectId //Con esto lo que hacemos es que cada tarea tiene un proyecto y su tipo de relacion va a ser un Object.ID
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
    }
},{timestamps: true}) //este es el esquema de mongoose

//TypeScript detecta los subdocumentos como si fueran arreglos 

const Task = mongoose.model<ITask>('Task', TaskSchema) //De esta manera agregamos este modelo a la instancia de mongoose
//ese modelo de Mongoose hace referencia al ProjectType
export default Task