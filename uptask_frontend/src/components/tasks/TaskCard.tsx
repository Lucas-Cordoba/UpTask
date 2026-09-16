import { Fragment } from "react/jsx-runtime"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import type { Task } from "@/types"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTask } from "@/api/TaskAPI"
import { toast } from "react-toastify"
import {useDraggable} from '@dnd-kit/core'

type TaskCardProps = {
    task: Task
    canEdit: boolean
}
export default function TaskCard({ task, canEdit }: TaskCardProps) {

    const { attributes, listeners, setNodeRef,transform} = useDraggable({ //en la documentacion viene todo lo que soporta 
        id: task._id
    }) //requiere que le pases un valor



    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
            toast.success(data)
        }
    })


    const style = transform ? {
        // transform: `translateX(${transform.x}px)` //propiedad que te permite mover un elemetno de izquierda a derecha
        // transform: `translateY(${transform.y}px)` //propiedad que te permite mover un elemetno de arriba a abajo
        transform: `translate3D(${transform.x}px, ${transform.y}px,0)`,
        padding: "1.25rem",
        backgroundColor: "#FFF",
        width: '300px',
        display: 'flex',
        borderWidth: '1px',
        borderColor: 'rgb(203 213 225 / var(--tw-border-opacity))' 
        //no convence mucho este css para que cuando arrastre parece que se arrastre todopero por ahoira es la unica solucion  
        
    } : undefined
    return (
        <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
            <div 
            {...listeners} //eventos de presionar y arrastrar
            {...attributes} //arrastra los atributos
            ref={setNodeRef} //elemento que se requiere finalmente
            style={style} //ponemos todo el div porque si ponemos en li te mueve todo pero deshabiltia las acciones de los puntitos, es un bug que no se mueva todo el div DESHABILITA TODAS LAS FUNCIONES QUE TIENE EL BOTON
            className="min-2-0 flex flex-col gap-y-4">
                <p
                    className="text-xl font-bold text-slate-600 text-left"
                >{task.name}</p>
                <p className="text-slate-500">{task.description}</p>
            </div>


            <div className="flex shrink-0  gap-x-6"> {/** Este div es para los tres puntos donde dice Ver proyecto/ Editar / Eliminar */}
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                                <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                    onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
                                >
                                    Ver Tarea
                                </button>
                            </Menu.Item>

                            {canEdit && (
                                <>
                                    <Menu.Item>
                                        <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                            onClick={() => navigate(location.pathname + `?editTask=${task._id}`)} //en la url lo ponemos el taskId
                                        >
                                            Editar Tarea
                                        </button>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-red-500'
                                            onClick={() => mutate({ projectId, taskId: task._id })}
                                        >
                                            Eliminar Tarea
                                        </button>
                                    </Menu.Item>
                                </>
                            )}

                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
    )
}
