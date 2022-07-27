const express = require('express');

const router = express.Router();

const app = express();

const productController = require('../controllers/productController');

router.get('/', productController.productsList)

router.get('/productCart',productController.cart);

router.get('/productDetail',productController.detail);

router.get('/createProduct',productController.create);

router.get('/editProduct' ,productController.edit);

module.exports = router