import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default api
//es mejor hacer esto por las dudas si cambiamos de servidor solo se hace el cambio aca y no ir pagina por pagina

/**Exacto, lo entendiste muy bien. La idea principal es esa, solo con un par de matices técnicos:

origin: Representa la URL/dominio del cliente desde el cual se envía cualquier petición (GET, POST, PUT, DELETE, etc.), como por ejemplo http://localhost:5173.


callback: Es la función encargada de responderle a Express si se permite o bloquea el acceso: */