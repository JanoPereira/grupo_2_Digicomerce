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

const createProductMiddleware = require('../middlewares/createProductMiddleware');

// /products/....

//TODO: acceder a editar producto solo para admin/vendedor

router.get('/product-cart',productController.cart);

router.get('/search',productController.search);

router.get('/product-detail/:id',productController.detail);

router.get('/create-product', productController.create);

router.post('/create-Product',upload.array('image'), createProductMiddleware, productController.upload);

router.get('/edit-product/:id' ,productController.edit); 

router.put('/edit-product/:id',upload.array('image'),productController.update);

router.get('/delete-product/:id', productController.delete)

router.delete('/delete-product/:id', productController.deleteProduct);

router.get('/product-cart/payment-detail',productController.checkout);

router.post('/product-cart/payment-detail',productController.savePaymentDetail);

router.get('/product-cart/payment-method',productController.paymentMethod);

router.get('/category/:category', productController.showProducts);



module.exports = router;