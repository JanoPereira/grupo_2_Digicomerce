const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index:(req,res)=>{
        res.render('index')
    },
   
    about: (req,res) =>{
        res.render('about')
    },
    faq: (req,res) =>{
        res.render('faq')
    },
    pago: (req,res)=>{
        res.render('payment')
    }
    
}
module.exports = controller;