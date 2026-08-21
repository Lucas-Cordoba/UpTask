import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/Layouts/AppLayout";
import DashboardView from "@/views/DashboardView";

export default function Router() {

    return (

        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<DashboardView/>} index/> {/*Le ponemos index porque es la pagina principal */}
                </Route>
            </Routes>
        </BrowserRouter>
    )

}