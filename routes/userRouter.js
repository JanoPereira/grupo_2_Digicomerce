const express = require('express');

const router = express.Router();

const path = require('path');

const fs = require('fs');

const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */

const app = express();

const userController = require('../controllers/userController');

const registValidations=require('../middlewares/registValidations');

const guestMiddleware=require('../middlewares/guestMiddleware');

//USUARIOS
const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// /users/...




router.get('/my-account', userController.userInfo);

router.get('/registration-form',guestMiddleware,userController.register);

router.post('/registration-form', registValidations, userController.uploadUser);

router.get('/login-form',guestMiddleware, userController.login);

router.post('/login-form'/*, loginValidations TODO: PREGUNTAR SI VA*/, userController.processLogin);



module.exports = router;