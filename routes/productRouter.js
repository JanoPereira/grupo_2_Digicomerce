const express = require('express');

const router = express.Router();

const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */

const app = express();

const productController = require('../controllers/productController');

// /products/....

router.get('/', productController.productsList);

router.get('/teaProduct', productController.productTea);

router.get('/yerbas', productController.yerba);

router.get('/productCart',productController.cart);

router.get('/productDetail/:id',productController.detail);

router.get('/createProduct',productController.create);

router.post('/productCart/paymentDetail',productController.savePaymentDetail);

router.get('/editProduct/:id' ,productController.edit); 

router.put('/editProduct/:id',productController.update);

router.get('/productCart/paymentDetail',productController.paymentDetail);

router.post('/productCart/paymentDetail',productController.savePaymentDetail);

router.get('/productCart/paymentMethod',productController.paymentMethod);

module.exports = router;