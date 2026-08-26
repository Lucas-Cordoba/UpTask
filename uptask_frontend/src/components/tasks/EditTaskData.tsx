import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "@/api/TaskAPI"
import EditTaskModal from "./EditTaskModal"
//Lo unico que hace este componente es renderizar a EditTaskModal
export default function EditTaskData() {

    const params = useParams()
    const projectId = params.projectId

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search) //toma la cadena de consulta (query string) de la URL (por ejemplo, ?taskId=123&action=edit) y crea una instancia de objeto que facilita la lectura de sus valores.
    const taskId = queryParams.get('editTask')
    

    const {data, isError} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId //si tiene algo taskId le pone true y si no tiene nada le pone false taskId='gd5g5f4' --> true taskId=''--> false
        // //y si enabled es true la consulta se hace sino no
        // retry: false //que sea una consulta y redirigir al error 
    })
     
    if(isError) return <Navigate  to={'/404'}/> //manejar errores
  if(data) return <EditTaskModal data={data} taskId = {taskId}/>
  
}
