const express = require('express');
const { diskStorage } = require('multer');

const router = express.Router();

const path = require('path');

const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/img/products')
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname)
    }
});

let upload = multer({storage}).any

const app = express();

const productController = require('../controllers/productController');

// /products/....

router.get('/', productController.productsList);

router.get('/teaProduct', productController.productTea);

router.get('/yerbas', productController.yerba);

router.get('/accessories', productController.accessories);

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