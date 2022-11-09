const {body} = require('express-validator');
const fs = require('fs');
const path = require('path');
const db = require('../database/models')

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const registValidations = [
    body('name')
    .notEmpty() .withMessage('El nombre es obligatorio')
    .isLength({min: 2}) .withMessage('El nombre debe tener un mínimo de 2 caracteres')
    .custom ((value,{req})=>{
        let name = req.body.name 
        let regEx = /^[a-z ,.'-]+$/i;
        if (!regEx.test(name)){
            throw new Error("No puede contener números")
        }
        return true;
    }), 
    body('email')
    .notEmpty().withMessage('Debes completar el Campo').bail()
    .isEmail().withMessage('Debe ingresar un email válido').bail()
    .custom(async(value,{req})=>{
        let userEmail = req.body.email.toLowerCase();
        let emailInDataBase = await db.User.findOne({where:{email:userEmail}})
        if(emailInDataBase){
            throw new Error("Email ya registrado, ingrese otro")
        };
        return true;
    }),
    body('password')
    .isLength({min: 8}) .withMessage('La contraseña debe tener un mínimo de 8 caracteres'),
    body('confirmPassword')
    .custom((value,{req})=>{
        if(req.body.password!=req.body.confirmPassword){
            throw new Error('No coinciden las contraseñas')
        }
        return true;
    }),
    body('number')
    .custom((value,{req})=>{ /*regEX de phone number. Acepta Todo tipo de numero de telefono */
        let regEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g
        let phone = req.body.number;
        if(!regEx.test(phone)){
            throw new Error("Numero de telefono invalido");
        }
        return true;
    }),
    body('avatar')
    .custom((value,{req})=>{
        
        if(!req.file){
            return true
        }
        let fileExtension = path.extname(req.file.originalname).toLowerCase();
        console.log(fileExtension)
        let acceptedExtensions = ['.jpg','.jpeg','.gif','.png']
        if(!acceptedExtensions.includes(fileExtension)){
            throw new Error ('Formato de imagen invalido')
        }
        return true;
    })
];

module.exports=registValidations;