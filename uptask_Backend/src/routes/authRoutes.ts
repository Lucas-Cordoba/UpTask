import { Router } from 'express'
import { body } from 'express-validator'
import { AuthController } from '../controllers/AuthController'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacio'),
    body('password')
        .isLength({ min: 8 }).withMessage('El Password es corto, minimo 8 caracteres'),
    body('password_confirmation')
        .custom((value, { req }) => { //value trae el nombre de la variable, req.body.password trae el valor
            if (value !== req.body.password) {
                throw new Error('Los Password no son iguales')
            }
            return true
        }), //este body es para validar que los password sean iguales
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.createAccount)


router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El token no puede ir vacio'),
    handleInputErrors,
    AuthController.confirmAccount
)


router.post('/login',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    body('password')
        .notEmpty().withMessage('El Password no puede ir vacio'),
    body('password_confirmation'),
    handleInputErrors,
    AuthController.login

)


router.post('/request-code',
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    AuthController.requestConfirmationCode

)
export default router

