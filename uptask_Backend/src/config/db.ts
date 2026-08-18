import mongoose from "mongoose";
import colors from 'colors'
import { exit } from "node:process";

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL) //se aplica destructuring para que abajo no tener que poner dos veces connection
        const url = `${connection.host}:${connection.port}` //te da el host de la conexion y el puerto
        console.log(colors.magenta.bold(`MongoDB Conectado en: ${url}`))
    } catch (error) {
        // console.log(error.message)
        console.log(colors.red.bold('Error al conectar a MongoDB'))
        exit(1) //el programa fallo pero queremos finalizarlo, termina la conexion con un mensaje de error
    }
}