import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TaskForm from '@/components/tasks/TaskForm';
import type { TaskFormData } from '@/types';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {

    const navigate = useNavigate()
    /**Leer si modal existe */
    const location = useLocation() //me permite leer datos desde la url
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask') //nos dice si existe en la url newTask
    const show = modalTask ? true : false //si modalTask existe osea si tiene newTask en la url va a ser true el show sino false
    //location.search: Accede a la cadena de texto/new URLSearchParams(...): Crea una instancia del objeto nativo de JavaScript URLSearchParams, el cual transforma esa cadena de texto en un objeto fácil de manipular mediante métodos. 
    //me pasa cuantos parametros tiene
    
    /**Obtener projectId */
    const params = useParams()
    const projectId = params.projectId!
    const initialValues : TaskFormData = {
        name: '',
        description: ''
    }
    const {register, handleSubmit,reset, formState:{errors}} = useForm({defaultValues: initialValues})
    
    const queryClient = useQueryClient()

const {mutate} = useMutation({
    mutationFn: createTask,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({queryKey: ['editProject', projectId]}) //Esta línea de código se usa en React Query (TanStack Query) para forzar la actualización de los datos del proyecto actual una vez que se realiza una modificación, como que realiza un refresh de la pagina
        toast.success(data)
        reset()
        navigate(location.pathname, { replace: true })

    }
})

    const handleCreateTask = (formData: TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>  {/**el replace lo que hace es borrar query string // con el location.pathname lo que hace es quedarse en la misma url*/}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form
                                        onSubmit={handleSubmit(handleCreateTask)}
                                        className='mt-10 space-y-3'

                                    >
                                        <TaskForm
                                            errors={errors}
                                            register={register}
                                        />
                                        <input
                                            type="submit"
                                            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                            value='Guardar Tarea'
                                        />


                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}