import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";

export const useAuth = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false, //esto es para que si falla la peticion, decir cuantas veces queremos que lo intente de nuevo, en este caso no queremos que lo intente
        refetchOnWindowFocus: false //evitar que vuelva a consultar la API cada vez que cambias de pestaña en el navegador y regresas a la aplicación
    })

    return {data, isLoading, isError}
}

//hicimos este hook para poder usarlo en cualquier componente y asi obtener la informacion del usuario logueado, ya que si lo hacemos en un componente y luego queremos usarlo en otro, tendriamos que hacer la misma peticion de nuevo, con este hook podemos usarlo en cualquier componente