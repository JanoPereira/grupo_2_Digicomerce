const express = require('express');

const router = express.Router();

const app = express();

const mainController = require('../controllers/mainController');

router.get('/',mainController.index);

router.get('/carro-compras',mainController.carro);

router.get('/about',mainController.about)

router.get('/registrationForm',mainController.registro)

router.get('/faq',mainController.faq)

router.get('/loginForm',mainController.login)

router.get('/productDetail',mainController.detail)

module.exports = router;