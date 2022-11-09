const express = require('express');

const router = express.Router();

const app = express();

const apiProductController = require('../../controllers/api/productApiController');

///api/product/....

router.get('/',apiProductController.list);

router.get('/:id',apiProductController.detail)

//TODO: 


module.exports = router;