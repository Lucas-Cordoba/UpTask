import type { ProjectFormData } from "@/types";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
export async function createProject(formData : ProjectFormData) {
    try {
        const {data} = await api.post('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) //con este if y esto va a caer en la parte de onError de ReactQuery
            //lanzamos un error que va a ser la respuesta que tenemos de nuestra api
        }
    }
    
}
