const express = require('express');

const {body} = require('express-validator');

const router = express.Router();

const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */

const app = express();

const userController = require('../controllers/userController');

// /users/...

let validations = [
    body('name')
    .notEmpty() .withMessage('El nombre es obligatorio'),
    body('email')
    .isEmail() .withMessage('Debe ingresar un email válido'),
    body('password')
    .isLength({min: 6}) .withMessage('La contraseña debe tener un mínimo de 6 caracteres')   
];

router.get('/my-account', userController.userInfo);

router.get('/registration-form',userController.register);

router.post('/registration-form', validations, userController.uploadUser);

router.get('/login-form', userController.login);



module.exports = router;