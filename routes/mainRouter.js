const express = require('express');

const router = express.Router();

const app = express();

const mainController = require('../controllers/mainController');



router.get('/',mainController.index);

router.get('/about',mainController.about)

router.get('/faq',mainController.faq)

// router.get('/info-usuario',mainController.userInfo);//

router.get('/payment',mainController.pago);

module.exports = router;