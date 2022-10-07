const express = require('express');

const router = express.Router();

const path = require('path');

const fs = require('fs');

const app = express();

const userController = require('../controllers/userController');

const registValidations=require('../middlewares/registValidations');

const updateUserValidations=require('../middlewares/updateUserValidations');

const loggedMiddleware= require('../middlewares/loggedMiddleware');

const guestMiddleware= require('../middlewares/guestMiddleware');

//USUARIOS
const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// /user/...


//MULTER
const multer = require('multer'); /* Requerir multer. En el form como atributo va --> (enctype = "multipart/form-data") */

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/img/users')
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({storage})



router.get('/profile',guestMiddleware ,userController.userInfo);
router.get('/edit/:id',guestMiddleware,userController.edit);
router.put('/edit/:id',upload.single('avatar'),updateUserValidations, userController.update);

router.get('/registration-form',loggedMiddleware,userController.register);

router.post('/registration-form', upload.single('avatar'),registValidations, userController.uploadUser);

router.get('/login-form',loggedMiddleware, userController.login);

router.post('/login-form'/*, loginValidations TODO: PREGUNTAR SI VA*/, userController.processLogin);

router.get('/logout',userController.logout)



module.exports = router;