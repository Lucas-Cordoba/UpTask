import mongoose, {Schema, Document }from "mongoose";


export interface IUser extends Document {
    email: string
    password: string
    name: string
    confirmed: boolean
}

const userSchema : Schema = new Schema ({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})


const User = mongoose.model<IUser>('User', userSchema)//Esa línea registra y compila el esquema en Mongoose (en memoria de Node.js) y te devuelve la interfaz que usas para realizar operaciones CRUD, Registra el modelo llamado 'User' usando el esquema userSchema y los tipos TypeScript de IUser.
export default User