const express = require('express');

const router = express.Router();

const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */

const app = express();

const userController = require('../controllers/userController');

// /users/...

router.get('/my-account', userController.userInfo)

router.get('/registration-form',userController.register);

router.post('/registration-form',userController.uploadUser);

router.get('/login-form', userController.login);



module.exports = router;