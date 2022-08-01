const express = require('express');

const router = express.Router();

const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */

const app = express();

const userController = require('../controllers/userController');

// /users/...

router.get('/', userController.userInfo)

router.get('/registrationForm',userController.register);

router.get('/loginForm',userController.login);

module.exports = router;