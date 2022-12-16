const express = require('express');

const router = express.Router();

const app = express();

const apiProductController = require('../../controllers/api/productApiController');

///api/product/....

router.get('/',apiProductController.list);

router.post('/checkout',apiProductController.checkout);

router.post('/addTempItem',apiProductController.addTempItem);

router.put('/updateTempItems',apiProductController.updateTempItems);

router.delete('/deleteTempItem',apiProductController.deleteTempItem);

router.get('/:id',apiProductController.detail);

//TODO: 


module.exports = router;