import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import { Navigate } from "react-router-dom"
import EditProjectForm from "@/components/projects/EditProjectForm"
export default function EditProjectView() {

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


    if(data) return <EditProjectForm data ={data} projectId= {projectId}/>
}
