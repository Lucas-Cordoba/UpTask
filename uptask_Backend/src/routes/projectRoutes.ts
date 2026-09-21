import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { TaskController } from '../controllers/TaskController'
import { handleInputErrors } from '../middleware/validation'
import { projectExists } from '../middleware/Project'
import { hasAuthorization, taskExists } from '../middleware/task'
import { authenticate } from '../middleware/auth'
import { TeamMemberController } from '../controllers/TeamController'
import { NoteController } from '../controllers/NoteController'


const router = Router()

router.use(authenticate)//esto lo que hace es que todas las rutas que esten debajo de esta linea van a pasar por el middleware de authenticate, y si no pasa por el middleware entonces no va a poder acceder a ninguna ruta de projectRoutes
/** Routes for project */
router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),
    handleInputErrors, //si pasa esto entonces se va a crear
    ProjectController.createProject

)



router.get('/', ProjectController.getAllProjects) //en este caso se pone la ruta y el controlador que va a llamar esa ruta y la funcion que debe utilizar

router.get('/:id',

    param('id')
        .isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    ProjectController.getProjectById

) //en este caso se pone la ruta y el controlador que va a llamar esa ruta y la funcion que debe utilizar

/** Routes for tasks*/

router.param('projectId', projectExists) //toma un parametro y segundo un callback, con esto en todas las url que tengan el parametro projectId se va a ejecutar validateProjectExists

router.put('/:projectId',

    param('projectId')
        .isMongoId().withMessage('ID no válido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),
    handleInputErrors,
    hasAuthorization,
    ProjectController.updateProject

) //en este caso se pone la ruta y el controlador que va a llamar esa ruta y la funcion que debe utilizar



router.delete('/:projectId',

    param('projectId')
        .isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    hasAuthorization,
    ProjectController.deleteProject

)


router.post('/:projectId/tasks',
    hasAuthorization,
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es Obligatoria'),
    handleInputErrors, //si pasa esto entonces se va a crear
    TaskController.createTask) //esta va a hacer la url de project y cuando presionas ahi con la url de project se agrega ID/tasks


router.get('/:projectId/tasks',
    TaskController.getProjectTasks)

router.param('taskId', taskExists)



router.get('/:projectId/tasks/:taskId',
    param('taskId')
        .isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TaskController.getTasksById)


router.put('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId')
        .isMongoId().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es Obligatoria'),
    handleInputErrors,
    TaskController.updateTask)


router.delete('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId')
        .isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TaskController.deleteTask)

router.post('/:projectId/tasks/:taskId/status',
    
    param('taskId')
        .isMongoId().withMessage('ID no válido'),
    body('status')
        .notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus


)

/**Routes for teams */
router.post('/:projectId/team/find',
    body('email')
        .isEmail().toLowerCase().withMessage('El email no es válido'),
    handleInputErrors,
    TeamMemberController.findTeamMemberByEmail
)

router.get('/:projectId/team',
    TeamMemberController.getProjectTeam
)

router.post('/:projectId/team',
    body('id')
        .isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TeamMemberController.addMemberById
)

router.delete('/:projectId/team/:userId',
    param('userId')
        .isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TeamMemberController.removeMemberById
)

/**Routes for Notes */

router.post('/:projectId/tasks/:taskId/notes',
    body('content')
            .notEmpty().withMessage('El contenido de la nota es obligatorio'),
    handleInputErrors,
    NoteController.createNote
)


router.get('/:projectId/tasks/:taskId/notes',
    NoteController.getTaskNotes

)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('ID No Válido'),
    handleInputErrors,
    NoteController.deleteNote
)
export default router