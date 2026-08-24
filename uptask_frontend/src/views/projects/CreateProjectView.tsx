import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation } from "@tanstack/react-query"
import ProjectForm from "@/components/projects/ProjectForm"
import type { ProjectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"
import { toast } from "react-toastify"


export default function CreateProjectView() {

    const navigate = useNavigate()
    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: createProject, //funcion que se va a mandar a llamar cunado queramos realizar una mutacion ( modificacion en la base de datos), solo se pasa el nombre de la funcion
        onError: (error) => { //codigo si es que hay un error
            toast.error(error.message)
        },
        onSuccess: (data) => { //condigo si sale todo ok
            toast.success(data)
            navigate('/') //con ese navigate nos redirecciona a la pagina principal

        }
    })
    const handleForm = /*async*/ (formData: ProjectFormData) => {
        // const data = await createProject(formData) //una vez que pase la validacion se guardan los datos en data esto solo era necesario sin el mutation de react query

        //    await mutation.mutateAsync(formData) //aca llama a la funcion useMutation y le pasa formData
        //mutateAsync es igual que mutate nada mas que se pone la funcion como asincrona y el await en cambio mutate maneja eso react query
        mutation.mutate(formData)
    }
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">
                    Crear Proyectos
                </h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Llena el siguiente formulario para crear un proyecto
                </p>

                <nav className="my-5">

                    <Link
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to='/'
                    >Volver a Proyectos</Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate //esto es para que deshabilite la validacion de HTML5 para realizarla nosotros 
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input
                        type="submit"
                        value='Crear Proyecto'
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
