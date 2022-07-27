const express = require('express');

const router = express.Router();

const app = express();

const userController = require('../controllers/userController');

router.get('/', userController.userInfo)

router.get('/registrationForm',userController.register);

router.get('/loginForm',userController.login);

module.exports = router;