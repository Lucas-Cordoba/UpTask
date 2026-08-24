import { z } from 'zod'

/** Projects */
export const projectSchema = z.object({
    _id: z.string(), //es un ObjectId pero en el json viene plano
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id:true,
        projectName:true,
        clientName:true,
        description:true
    }) //es el mismo que el Schema anterior pero ahora lo queremos como arreglo y no es un type lo queremos como shema para validar que la respuesta que obtenemos es la correcta 
)
export type Project = z.infer< typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

//sirve para crear un nuevo tipo de datos en TypeScript extrayendo únicamente las propiedades que necesitas de un tipo más grande (Project). sin el id