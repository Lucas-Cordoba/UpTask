import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import './index.css'
import Router from './router'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/** componente de la librería TanStack Query (anteriormente llamada React Query) que actúa como un proveedor de contexto para toda la aplicación.*/}

      <Router />
    <ReactQueryDevtools/> {/**es para ver el estado de nuestras consultas*/}


    </QueryClientProvider>
  </StrictMode>,
)
