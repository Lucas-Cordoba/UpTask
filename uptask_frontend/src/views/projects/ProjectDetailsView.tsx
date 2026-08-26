import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import { Navigate } from "react-router-dom"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
export default function ProjectDetailsView() {

    const navigate = useNavigate()

    const params = useParams() //asi obtenemos datos de la url
    const projectId = params.projectId! //operador de aserción de no nulo


    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId], //este queryKey debe ser unico, se pone projectId para que sea unica cada key y no muestre datos de consultas anteriores
        queryFn: () => getProjectById(projectId), //cuando se pasa un parametro en la funcionse debe hacer un callback
        retry: false
        // retry sirve para controlar cuántas veces reintentará la petición automáticamente cuando esta falle
        //Define la cantidad exacta de reintentos. Si pones retry: 1, intentará la consulta original y, si falla, hará 1 reintento adicional.
        //retry: false: Desactiva los reintentos. Si la petición falla, marcará la consulta como error la que te tira el backend
        //retry: true: Reintentará de forma infinita hasta que tenga éxito.
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'/>


    if(data) return (
        <>
        
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>


            <nav className="my-5 flex gap-3">
                <button
                type="button"
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl 
                font-bold cursor-pointer transition-colors"
                onClick={() => navigate( location.pathname + '?newTask=true')} //Esa línea abre una ventana modal (o activa una vista condicional) agregando un parámetro a la URL mediante search params (parámetros de consulta).
               >
                    Agregar Tarea
                </button>

            </nav>

            <TaskList
                tasks={data.tasks}
            />
            <AddTaskModal/>
            <EditTaskData/> 
        </>
    )
}
