import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN') //obtenemos el token del localStorage
    //tomamos el token del localStorage y se lo pasamos a la cabecera de la peticion 
    if(token){ //verificamos si hay token
        config.headers.Authorization = `Bearer ${token}` //si hay token se lo pasamos a la cabecera de la peticion
        //se lo pasamos a la cabecera de la peticion con el formato Bearer + token
    }
    return config //retornamos la configuracion de la peticion
})
 //cada vez que hagamos una peticion a la api/projects se va a ejecutar este interceptor y se va a agregar el token a la cabecera 
export default api
//es mejor hacer esto por las dudas si cambiamos de servidor solo se hace el cambio aca y no ir pagina por pagina

/**Exacto, lo entendiste muy bien. La idea principal es esa, solo con un par de matices técnicos:

origin: Representa la URL/dominio del cliente desde el cual se envía cualquier petición (GET, POST, PUT, DELETE, etc.), como por ejemplo http://localhost:5173.


callback: Es la función encargada de responderle a Express si se permite o bloquea el acceso: */