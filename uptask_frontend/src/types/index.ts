import { z } from 'zod'

/* Auth & Users */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' |  'password_confirmation'>

export type ConfirmToken = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>

/**Users */
export const userSchema = authSchema.pick({
    name:true,
    email:true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>

/** Tasks */

export const taskStatusSchema = z.enum([
    "pending","onHold", "inProgress", "underReview"
])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(), //es un ObjectId pero en el json viene plano
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt:z.string(),
    updatedAt:z.string()
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'> //Lo que necesitamos para el formulario
/** Projects */
export const projectSchema = z.object({
    _id: z.string(), //es un ObjectId pero en el json viene plano
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({_id: true}))
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id:true,
        projectName:true,
        clientName:true,
        description:true,
        manager:true
    }) //es el mismo que el Schema anterior pero ahora lo queremos como arreglo y no es un type lo queremos como shema para validar que la respuesta que obtenemos es la correcta 
)
export type Project = z.infer< typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description' | 'manager'>

//sirve para crear un nuevo tipo de datos en TypeScript extrayendo únicamente las propiedades que necesitas de un tipo más grande (Project). sin el id


/**Team*/

const teamMemberSchema = userSchema.pick({
    name:true,
    email:true,
    _id: true
})


export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>