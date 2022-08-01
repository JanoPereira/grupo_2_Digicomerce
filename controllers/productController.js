const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
    productsList: (req,res) => {
        // TODO: falta crear lista de productos //
        res.send('productList')
    },

    productTea: (req, res) => {
		const te = products.filter (product => product.category === 'te');
		res.render('teaProduct', { te });
    },
    cart:(req,res) =>{
        res.render('productCart')
    },
    detail: (req,res) =>{
        res.render('productDetail')
    },
    create: (req,res) => {
        res.render('createProduct')
    },
    edit: (req,res) => {
        res.render('editProduct')
    },
    paymentDetail: (req,res)=>{
        res.render('paymentDetail')
    },
    paymentMethod: (req,res)=>{
        res.render('paymentMethod')
    }
};
module.exports = productController;