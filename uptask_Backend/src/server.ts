import  express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from './routes/projectRoutes'

dotenv.config() //sirve para cargar las variables de entorno definidas en tu archivo .env dentro del objeto global process.env de Node.js
connectDB()

const app = express()
app.use(cors(corsConfig))
app.use(express.json())
//Routes
app.use('/api/projects', projectRoutes)
export default app