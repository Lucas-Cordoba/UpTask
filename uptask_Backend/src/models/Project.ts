import mongoose, {Schema, Document} from "mongoose";

export type ProjectType = Document & //se pone Type para que no haya dos variables llamadas iguales
{
    projectName: string,
    clientName: string,
    description: string
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
    }
}) //este es el esquema de mongoose


const Project = mongoose.model<ProjectType>('Project', ProjectSchema) //De esta manera agregamos este modelo a la instancia de mongoose
//ese modelo de Mongoose hace referencia al ProjectType
export default Project