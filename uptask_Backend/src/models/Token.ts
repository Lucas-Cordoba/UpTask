import mongoose, { Schema, Document, Types } from "mongoose";


export interface IToken extends Document {
    token: string
    user: Types.ObjectId //se relaciona con el user
    createdAt: Date
}

const tokenSchema: Schema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    expiresAt: {
        type: Date,
        default: Date.now(),
        expires: "10m" //Un proceso en segundo plano de MongoDB revisa periódicamente la base de datos y borra automáticamente el documento cuando transcurre el tiempo especificado
        //el expires es para que expire en 10 min
    }
})
const Token = mongoose.model<IToken>('Token', tokenSchema)
export default Token