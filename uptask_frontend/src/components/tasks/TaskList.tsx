import { DndContext, DragEndEvent } from "@dnd-kit/core"; //<DndContext> es el componente contenedor principal (el proveedor de contexto) de @dnd-kit/core. Sirve para coordinar, gestionar y sincronizar todo el estado global del sistema de arrastrar y soltar (drag and drop) en tu aplicación.
import { Project, type Task, type TaskStatus } from "@/types"
import TaskCard from "./TaskCard"
import { statusTranslations } from "@/locales/es"
import DropTask from "./DropTask"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStatus } from "@/api/TaskAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
type TaskListProps = {
    tasks: Task[]
    canEdit: boolean
}
type GroupedTasks = { //Este código define un tipo de TypeScript (llamado GroupedTasks) utilizando un índice de firma (index signature). Sirve para decirle a TypeScript cómo debe lucir un objeto cuyas propiedades (claves) no conocemos de antemano, pero sabemos qué tipo de datos tendrán
    [key: string]: Task[]
}
const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusStyles: { [key: string]: string } = { //Sirve para indicarle a TypeScript que la constante statusTranslations será un objeto donde cualquier clave (key) será un texto (string) y su valor correspondiente también será un texto (string).
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}




export default function TaskList({ tasks, canEdit }: TaskListProps) {


    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
            toast.success(data)
        }
    })

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups); //se van a crear una serie de arreglos en initialStatusGroups y van a ser del tipo GroupedTasks
    //lo que hace es agrupar en objetos la tarea por cada estado

    const handlerDragEnd = (e: DragEndEvent) => {
        const { over, active } = e
        if (over && over.id) {
            const taskId = active.id.toString()
            const status = over.id as TaskStatus //si le pongo .toString() da error
            mutate({ projectId, taskId, status })

            queryClient.setQueryData<Project>(['project', projectId], (prevData) => {
                const updatedTasks = prevData.tasks.map((task : Task) => {
                    if(task._id === taskId){
                        return{
                            ...task,
                            status
                        }
                    }
                    return task
                })
                return {
                    ...prevData,
                    tasks: updatedTasks
                }
            }) //funcion asyncrona que puede ser utilizada para inmediatamente actualizar los resultados de una consulta que esta en cache toma una queryKey y updater que es una funcion que actuzalice el state
        }
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handlerDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3
                                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 
                        border-t-8 ${statusStyles[status]}`}>
                                {statusTranslations[status]}</h3>
                            <DropTask status={status} />
                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>

    )
}

//<h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8`}>{statusTranslations[status]}</h3>  Esa sintaxis se utiliza en JSX / React para aplicar plantillas de cadena de texto clase dinámica obtenida del objeto statusTranslations según el estado actual (status)
/**Recorre el arreglo tasks para acumular todas las tareas en un único objeto (acc), que inicialmente se define como un objeto vacío {} (nota: en tu código hay un pequeño detalle, ya que inicia con [], pero lo adecuado es {}).

acc[task.status]: Comprueba si en el objeto acumulador ya existe un grupo (un arreglo) para el estado de la tarea actual (por ejemplo: "pending", "completed", etc.).

let currentGroup = ...: Si el grupo ya existe, genera una copia de las tareas que tenía guardadas. Si aún no existe, inicializa un arreglo vacío [].

currentGroup = [...currentGroup, task]: Agrega la tarea actual al final del arreglo de su estado correspondiente.

return { ...acc, [task.status]: currentGroup }: Devuelve una copia del acumulador con la propiedad del estado actualizada. */