const express = require('express');
const { diskStorage } = require('multer');

const router = express.Router();

const path = require('path');

// MULTER

const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/img/products')
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
});

let upload = multer({storage})

const app = express();

const productController = require('../controllers/productController');

// /products/....

router.get('/', productController.productsList);

router.get('/:category', productController.showProducts);

router.get('/productCart',productController.cart);

router.get('/productDetail/:id',productController.detail);

router.get('/createProduct',productController.create);

router.post('/createProduct',upload.array('image'),productController.upload);

router.get('/editProduct/:id' ,productController.edit); 

router.put('/editProduct/:id',upload.array('image'),productController.update);

router.get('/productCart/paymentDetail',productController.paymentDetail);

router.post('/productCart/paymentDetail',productController.savePaymentDetail);

router.get('/productCart/paymentMethod',productController.paymentMethod);

module.exports = router;