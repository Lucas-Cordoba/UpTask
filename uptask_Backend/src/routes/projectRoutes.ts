import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { TaskController } from '../controllers/TaskController'
import { handleInputErrors } from '../middleware/validation'
import { projectExists } from '../middleware/project'
import { taskExists } from '../middleware/task'
import { authenticate } from '../middleware/auth'

const router = Router()

/** Routes for project */
router.post('/',
    
    authenticate,
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
    ProjectController.getAllProjectById

) //en este caso se pone la ruta y el controlador que va a llamar esa ruta y la funcion que debe utilizar


router.put('/:id',

    param('id')
        .isMongoId().withMessage('ID no válido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es Obligatoria'),
    handleInputErrors,
    ProjectController.updateProject

) //en este caso se pone la ruta y el controlador que va a llamar esa ruta y la funcion que debe utilizar



router.delete('/:id',

    param('id')
        .isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    ProjectController.deleteProject

)

/** Routes for tasks*/

router.param('projectId', projectExists) //toma un parametro y segundo un callback, con esto en todas las url que tengan el parametro projectId se va a ejecutar validateProjectExists

router.post('/:projectId/tasks',
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
    param('taskId')
        .isMongoId().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es Obligatoria'),
    handleInputErrors,
    TaskController.updateTask)


router.delete('/:projectId/tasks/:taskId',
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


export default router