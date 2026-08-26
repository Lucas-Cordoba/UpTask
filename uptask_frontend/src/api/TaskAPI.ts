import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type { Project, Task, TaskFormData } from "@/types";

type TaskAPI = {
    formData: TaskFormData,
    projectId: Project['_id']
    taskId: Task['_id']
}
export async function createTask({formData, projectId}: Pick<TaskAPI, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function getTaskById({projectId,taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) { //Con Pick ya obtenemos la forma muy limpia de estructurar y reutilizar tipos en TypeScript.
    try {
        const url= `/projects/${projectId}/tasks/${taskId}`
        const {data} = await api(url) //no ponemos .get porque axios ya tiene por default que se haga un get
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) //con este if y esto va a caer en la parte de onError de ReactQuery
            //lanzamos un error que va a ser la respuesta que tenemos de nuestra api
        }
    }
    
}

export async function updateTask({formData, taskId, projectId} : Pick<TaskAPI, 'formData' | 'taskId' | 'projectId'>) {
    try {
        const url= `/projects/${projectId}/tasks/${taskId}`
        const {data} = await api.put<string>(url, formData) //El put pasa la ruta y el nuevo objeto
        //el <string> formato de dato que va a retornar
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) //con este if y esto va a caer en la parte de onError de ReactQuery
            //lanzamos un error que va a ser la respuesta que tenemos de nuestra api
        }
    }
    
}

export async function deleteTask({projectId,taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) { //Con Pick ya obtenemos la forma muy limpia de estructurar y reutilizar tipos en TypeScript.
    try {
        const url= `/projects/${projectId}/tasks/${taskId}`
        const {data} = await api.delete<string>(url) //no ponemos .get porque axios ya tiene por default que se haga un get
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) //con este if y esto va a caer en la parte de onError de ReactQuery
            //lanzamos un error que va a ser la respuesta que tenemos de nuestra api
        }
    }
    
}

