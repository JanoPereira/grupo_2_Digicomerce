const {body} = require('express-validator');
const fs = require('fs');
const path = require('path');
const db = require('../database/models')

const createProductMiddleware = [
    body('name')
    .notEmpty() .withMessage('El nombre es obligatorio').bail()
    .isLength({min: 5}) .withMessage('El nombre debe tener un mínimo de 5 caracteres')
    ,
    body('image')
    .custom((value,{req})=>{
        // jpg,gif,png
        let acceptedExtensions = ['.jpg','.jpeg','.gif','.png']
        let invalidFiles = []
        if(!req.files){
            return true;
        }
        req.files.forEach(file => {
        let fileExtension = path.extname(file.originalname).toLowerCase();
       
        if(!acceptedExtensions.includes(fileExtension)){
            invalidFiles.push (file.originalname)
        }
        })
        if( invalidFiles.length > 0) {
            console.log(invalidFiles.join('-'))
            throw new Error ('Formato de imagen invalido en : '+ invalidFiles.join(' - '))
        }
        return true;
    }),
    body('description')
    .isLength({min: 20}).withMessage('La descripcion debe tener un mínimo de 20 caracteres'),
    body('category')
    .custom((value,{req})=>{
        if(!req.body.category){
            throw new Error('La categoria del producto es obligatoria');
        }
        return true
    })
];

module.exports = createProductMiddleware;