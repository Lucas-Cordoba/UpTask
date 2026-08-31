import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
export default function AuthLayout() {
    return (
        <>
            <div className="bg-gray-800 min-h-screen">.
                <div className="py-10 lg:py-20 mx-auto w-[450px] ">
                    <Logo />
                    <div className="mt-10">
                        <Outlet/>
                    </div>
                </div>

            </div>

            <ToastContainer //lo ponemos aca porque va a estar en varias vistas
                pauseOnHover={false}
                pauseOnFocusLoss={false} //esto es para que cunado me posiciones arriba de la notificacion no se frene
            />
        </>
    )
}
