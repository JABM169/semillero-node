import { Router } from 'express';
import {body} from 'express-validator';
import { createAccount, login } from './handlers';
import { handleInputErrors } from './middleware/validation';

const router = Router();

router.post('/auth/register', 
    body('handle')
        .notEmpty()
        .withMessage('El handle no debe estar vacio!...'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no debe estar vacio!...'),
    body('email')
        .isEmail() 
        .withMessage('El email no es valido!...'),
    body('password') 
        .isLength({min:10})
        .withMessage('El password debe ser minimo de 10 caracteres!...'), 
    handleInputErrors,    
    createAccount);

    router.post('/auth/login',
        body('email')
            .isEmail()
            .withMessage('El email no es valido!...'),
        body('password')
            .notEmpty()
            .withMessage('El password no debe estar vacio!...'),
        handleInputErrors,    
        login);

export default router;