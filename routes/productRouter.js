const express = require('express');

const router = express.Router();

const app = express();

const productController = require('../controllers/productController');

router.get('/', productController.productsList);

router.get('/teaProduct', productController.productTea);

router.get('/productCart',productController.cart);

router.get('/productDetail',productController.detail);

router.get('/createProduct',productController.create);

router.get('/editProduct' ,productController.edit);

router.get('/productCart/paymentDetail',productController.paymentDetail);

router.get('/productCart/paymentMethod',productController.paymentMethod);

module.exports = router