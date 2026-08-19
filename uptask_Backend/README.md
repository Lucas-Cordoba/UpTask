MERN: MongoDB Express React Node.js

Un Stack es un conjunto de Herramientas para crear una app
Full Stack quiere decir que puedes crear el Stack Completo de una
App y MERN Stack te permite hacerlo al igual que PERN.
Nuestro backend sigue siendo Node con Express pero otras opciones son Nest.js o Fastify

MongoDB una base de datos NoSQL orientada a Documentos y grandes cantidades de datos, documentos son los registros que estan en una DB de este tipo, Esta enfocada en grandes cantidades de datos, 
Los datos son alamacenados en un formato similar a JSON(documentos) llamada BSON
Tablas se llaman colecciones y los registros documentos

Son bases de datos no relacionales
Las bases de datos NoSQL están diseñadas específicamente para modelos de datos específicos y tienen esquemas flexibles para crear
aplicaciones modernas

Este tipo de bases de datos son bastante comunes cuando hay una gran cantidad de transacciones de lectura / escritura y cuando los datos no son uniformes o relacionados

Se pueden relacionar las tablas a traves de claves foraneas o se pueden almacenar datos que no son uniformes o relacionados

apenas arrancamos un proyecto con node, express, typescript instalar en el servidor

npm init --y: Crea el archivo package.json inicial aceptando todas las respuestas por defecto
npm i express: Instala Express, el framework principal para crear tu servidor web
 npm i -D @types/express: Instala las definiciones de tipos de TypeScript para Express.
 npm i -D typescript @types/node tsx: El compilador oficial de TypeScript, Los tipos de TypeScript para la API nativa de Node.js, El ejecutor rápido que te permite correr archivos .ts en desarrollo y reiniciar el servidor automáticamente cuando haces cambios
npm i -D tsx

Configurar tambien archivo tsconfig.json

Mongo DB Compass
MongoDB Compass es la interfaz gráfica de usuario (GUI) oficial para MongoDB. Está diseñada para interactuar con tus bases de datos visualmente sin necesidad de escribir comandos en la terminal.


Las consultas de mongoDB son bastantes complejas 

Veamos un ORM de MongoDB y Node.js


Mongoose

Mongoose es un ODM para Node.js
ORM es Object Relational Mapping, en el caso de ODM es lo mismo solo la D es por Document que es como en MongoDB se le conoce a la información almacenada en las colecciones.
Mongoose es un ODM que simplifica bastantes tareas y puede ser la herramienta más madura de este tipo en Node.js

Al igual que Sequelize se utilizan Modelos para diseñar los tipo de datos que tendrá nuestra información.
Tiene una gran cantidad de métodos para realizar las diferentes acciones del CRUD(crear, obtener, actualizar, eliminar, etc.)
Se utiliza junto otras dependencias para manejar autenticación de usuarios, hash de password y mas.
se integra bastante bien con otras herramientas


MVC Debemos definir una arquitectura

Model View Controller 

Patrón de Arquitectura de Software que permite la separación de obligaciones de cada pieza de tu código.

Enfatiza la separación de la lógica de programación con la presentación.

MVC es la arquitectura más común hoy en día tanto para web y se utiliza en cualquier lenguaje.

Ventajas
- Un mejor orden y escalabilidad en tu proyecto.
- Al implementar una arquitectura probada como MVC todos los programadores de un grupo saben exactamente donde encontrar el código encargado de realizar alguna tarea.
- Aprende MVC y cualquier framework MVC te será fácil de aprender.

Encargado de todo lo relacionado a los datos, Base de datos y el CRUD, el Modelo esta muy relacionado a tu ORM u ODM.

Modelo / Models
El Modelo se encargará de consultar una base de datos pero no se encarga de mostrar esos datos.
Una vez que interactua con la base de datos, ahi termina el trabajo del modelo

Vistas / Views
Se encarga de todo lo que se ve en pantalla (HTML).
El Modelo se encargará de consultar la base de datos pero es la vista la que se encarga de mostrar los resultados.
En nuestro proyecto, React es la vista

Controlador / Controller

Es el que comunica Modelo y Vista, antes de que el modelo consulte a la base de datos el Controlador es el encargado de llamarlo, una vez que el Modelo ya consultó la base de datos, es el Controlador quien le comunica a la vista los datos para que los muestre.

Router

Encargado de registrar todas las URL's o Endpoints que soporta nuestra aplicación.


Ejemplo: Si el usuario accede a una URL el Router ya tiene indicaciones de comunicarse con un Controlador en especifico, ese
Controlador ya sabe que Modelo va a llamar y que vista va a ejecutar.

MVC Arquitectura

Router(endpoint) --> Controlador --> Modelo --> Controlador --> Vista --> Se muestra al usuario

Las inyecciones SQL y todo eso se encarga el ORM

Un ObjectId es un tipo de datos que sirve para crear ID 

Nested Resource Routing (Forma en la que estructuramos las rutass)


El "Nested Resource Routing" o "Enrutamiento de Recursos, este es para API's en el especial para APIs RESTful
Anidados" es un patrón de diseño en la construcción de URLs para APls, especialmente en APls RESTful, donde las relaciones jerárquicas entre recursos son expresadas en la estructura de la URL. Este patrón es muy común en aplicaciones web y móviles que manejan datos relacionados en forma de recursos.

Las ventajas es que 

por ejemplo /projects/:projectId/tasks 
nos ayuda con la seguridad y aparte como se pasa el id vamos a saber si el proyecto existe, si el usuario tiene permisos, crear tareas en ese proyecto, podemos obtenerlas, eliminarlas en caso de que el usuario tenga permisos y al ser asi tenemos menos validaciones en nuestro codigo.
Nos queda un codigo reutilizable y mas ordenado

En Express se implementa por medio de middleware 

Un middleware nos permite darle un mejor orden a nuestras rutas para aplicar este patron de diseño para las URL's 
Debido a que se ejecutan en las peticiones HTTP y antes del controlador, los hacen un gran lugar para poder ejecutar ciertas acciones referentes a si los proyectos existen o si el usuario tiene permisos para acceder a él