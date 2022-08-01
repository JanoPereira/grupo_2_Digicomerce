const express = require('express');

const router = express.Router();

const app = express();

const productController = require('../controllers/productController');

// /products/....

router.get('/', productController.productsList);

router.get('/teaProduct', productController.productTea);

router.get('/productCart',productController.cart);

router.get('/productDetail',productController.detail);

router.get('/createProduct',productController.create);

router.get('/editProduct' ,productController.edit); /* TODO: AGREGAR en la url el id del producto a editar  */

// TODO: ruta PUT para envio de info // 

router.get('/productCart/paymentDetail',productController.paymentDetail);

router.post('/productCart/paymentDetail',productController.savePaymentDetail);

router.get('/productCart/paymentMethod',productController.paymentMethod);

module.exports = router