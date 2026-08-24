npm i -D tailwindcss@3 postcss autoprefixer
Instala tres paquetes como dependencias de desarrollo (-D):

tailwindcss@3: El framework de CSS basado en clases de utilidad para diseñar rápido sin salir del HTML/JSX.

postcss: La herramienta que procesa y transforma el CSS (Tailwind funciona como un plugin de PostCSS).

autoprefixer: Un plugin de PostCSS que añade automáticamente los prefijos de los navegadores


npx tailwindcss init -p

Ejecuta el inicializador de Tailwind para generar los archivos de configuración iniciales:

-p: Le indica a Tailwind que cree dos archivos automáticamente:

tailwind.config.js: Donde defines qué archivos debe escanear Tailwind (propiedad content), temas personalizados, colores, fuentes, etc.

postcss.config.js: Configura PostCSS para que reconozca e integre los plugins de tailwindcss y autoprefixer.



En este proyecto usamos React Rotuer para el routing, React Query para las consultas y las mutaciones. React Form para los formularios

BrowserRouter: componente contenedor principal que envuelve toda tu aplicación
Routes: Funciona como un contenedor que evalúa todas las rutas definidas en su interior. 
Route:Define una ruta específica mapeando una URL con un componente.

npm i -D @types/node soporte para que funcione correctamente



headlessui.com
librería de componentes de interfaz de usuario (UI) sin estilos predefinidos (unstyle), creada por el mismo equipo detrás de Tailwind CSS.

tailwindui.com es costosa pero para multiples proyectos, o un prroyecto como servicio tiene muchos ejemplos y solo se copia y pegas y ahorra mucho tiempo


React Query o TanStack Query(hay varias herramientas pero en react se llama React Query)
-Es una libreria para obtener datos del servidor
-Sus ventajas principales es que obtiene los datos de forma optimizada y rápida, ademas cachea las consultas, sincroniza/actualiza los datos del servidor de forma muy simple
-Se puede utilizar con fetch API o Axios
Toastify en la pagina se puede cambiar los atributos

Conceptos nuevos tiene muchos pero estos son los dos mas importantes

Queries(obtener): Se utilizar para obtener datos de un servidor o una API(GET)
Mutations(modificar): Se utilizan para crear/actualizar/eliminar datos en el servidor(POST,PUT,PATCH,DELETE)

https://tanstack.com  esta es la pagina de la doc

Query: tiene queryKey un atributo que es un identificador unico y con ese key sabemos como cachear los resultados de las consultas para reutilizarlas y no hacer tantos llamados hacia la API
y queryFn es lo mismo que mutationFn solamente es la funcion que se encarga de realizar el query

Toast Container
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>

Toast Emitter
toast('🦄 Wow so easy!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});