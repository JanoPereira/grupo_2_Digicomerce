const express = require('express');

const router = express.Router();

const path = require('path');

const app = express();

const userApiController = require('../../controllers/api/userApiController');

router.get('/',userApiController.list);

router.get('/:id',userApiController.detail);

router.post('/:id/createTempCart',userApiController.createTempCart);


module.exports = router;