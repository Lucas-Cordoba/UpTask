# 🚀 UpTask - Administrador de Tareas y Proyectos

UpTask es una aplicación web Full Stack de gestión de proyectos y tareas diseñada para facilitar la colaboración en equipo. Cuenta con un sistema avanzado de control de acceso basado en roles, autenticación segura, gestión de colaboradores e interfaz interactiva con *drag & drop*.

---

## ✨ Características Principales

* **Autenticación y Seguridad:**
  * Registro de usuarios con confirmación de cuenta vía correo electrónico.
  * Autenticación basada en JSON Web Tokens (JWT).
  * Funcionalidad para reestablecer contraseña olvidada.
* **Gestión de Proyectos y Roles:**
  * Creación, edición y eliminación de proyectos (exclusivo para el creador/administrador).
  * Asignación de colaboradores mediante búsqueda por correo.
  * Permisos y roles diferenciados (Manager vs. Colaborador).
* **Gestión de Tareas y Colaboración:**
  * CRUD completo de tareas asociadas a proyectos.
  * Cambio de estados de tareas mediante interacción **Drag & Drop**.
  * Historial y registro de cambios de estado (quién modificó la tarea).
  * Sistema de notas y comentarios dentro de cada tarea.
* **Perfil de Usuario:** Actualización de información personal y cambio de contraseña.

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
* **React** con **TypeScript**
* **React Query (TanStack Query):** Manejo eficiente del estado asíncrono y caché.
* **React Router DOM:** Enrutamiento y navegación.
* **Tailwind CSS & Headless UI:** Diseño responsivo y componentes UI estilizados.
* **React Hook Form:** Validación y procesamiento dinámico de formularios.

### **Backend**
* **Node.js** & **Express** con **TypeScript**
* **MongoDB** & **Mongoose:** Base de datos NoSQL y modelado de datos.
* **JWT (JSON Web Tokens):** Autenticación y protección de rutas REST API.
* **Nodemailer:** Envío de correos para confirmación y reestablecimiento de cuenta.

---

## 🚀 Instalación y Configuración Local

### **Prerrequisitos**
* Node.js (v18 o superior)
* Cuenta o instancia local de MongoDB
* Servicio de envío de correos (ej. Mailtrap, SendGrid o SMTP)

