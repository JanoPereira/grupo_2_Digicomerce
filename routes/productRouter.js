const express = require('express');

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

router.get('/product-cart',productController.cart);

router.get('/product-detail/:id',productController.detail);

router.get('/create-product',productController.create);

router.post('/create-Product',upload.array('image'),productController.upload);

router.get('/edit-product/:id' ,productController.edit); 

router.put('/edit-product/:id',upload.array('image'),productController.update);

router.get('/delete-product/:id', productController.delete)

router.delete('/delete-product/:id', productController.deleteProduct);

router.get('/product-cart/payment-detail',productController.paymentDetail);

router.post('/product-cart/payment-detail',productController.savePaymentDetail);

router.get('/product-cart/payment-method',productController.paymentMethod);

router.get('/category/:category', productController.showProducts);



module.exports = router;