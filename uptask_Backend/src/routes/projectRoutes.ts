import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()


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

export default router