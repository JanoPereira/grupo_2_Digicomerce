const {body} = require('express-validator');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const registValidations = [
    body('name')
    .notEmpty() .withMessage('El nombre es obligatorio'),
    body('email')
    .notEmpty().withMessage('Debes completar el Campo').bail()
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom((value,{req})=>{
        let userEmail = req.body.email.toLowerCase();
        if(users.find(us=>us.email==userEmail)){
            throw new Error("Email ya registrado, ingrese otro");
        }
        return true;
    }),
    body('password')
    .isLength({min: 6}) .withMessage('La contraseña debe tener un mínimo de 6 caracteres'),
    body('number')
    .custom((value,{req})=>{ /*regEX de phone number. Acepta Todo tipo de numero de telefono */
        let regEx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
        let phone = req.body.number;
        if(!regEx.test(phone)){
            throw new Error("Numero de telefono invalido");
        }
        return true;
    })
];

module.exports=registValidations;