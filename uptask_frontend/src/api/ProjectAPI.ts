import { dashboardProjectSchema, type ProjectFormData } from "@/types";
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


export async function getProjects() {
    try {
        const {data} = await api('/projects') //no ponemos .get porque axios ya tiene por default que se haga un get
        const response = dashboardProjectSchema.safeParse(data) //con esto obtenemos si lo que obtuvimos esta bien
        if(response.success){ //si el response.success es true que seria que esta bien lo que obtuvimos, se retorna el data
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error) //con este if y esto va a caer en la parte de onError de ReactQuery
            //lanzamos un error que va a ser la respuesta que tenemos de nuestra api
        }
    }
    
}