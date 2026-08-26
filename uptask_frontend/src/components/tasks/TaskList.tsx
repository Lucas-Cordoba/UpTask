import type { Task } from "@/types"
import TaskCard from "./TaskCard"

type TaskListProps = {
    tasks: Task[]
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

const statusTranslations: { [key: string]: string } = { //Sirve para indicarle a TypeScript que la constante statusTranslations será un objeto donde cualquier clave (key) será un texto (string) y su valor correspondiente también será un texto (string).
    pending: 'Pendiente',
    onHold: 'En Espera',
    inProgress: 'En Progreso',
    underReview: 'En Revision',
    completed: 'Completado'
}


export default function TaskList({ tasks }: TaskListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups); //se van a crear una serie de arreglos en initialStatusGroups y van a ser del tipo GroupedTasks
    //lo que hace es agrupar en objetos la tarea por cada estado
    return (
        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3
                            className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 
                        border-t-8 ${statusStyles[status]}`}> 
                            {statusTranslations[status]}</h3>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
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