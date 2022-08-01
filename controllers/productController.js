<<<<<<< HEAD
let fs = require('fs');
let path = require('path');
=======
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
>>>>>>> 3a673292401259d02164358554d8174a713cea50

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
    },
    savePaymentDetail: (req,res)=>{
        // res.send(req.body);
        const rndInt = Math.floor(Math.random() * 1000) + 1; /* Numero Random entre 1-1000 */
    
        let paymentDataFile = fs.readFileSync(path.join(__dirname,'../public/data/paymentData.json'),{encoding:"utf-8"});

        let data = JSON.parse(paymentDataFile);

        let newData = req.body;

        newData.id = rndInt;
        newData.delivered = false;

        data.push(newData);

        dataJSON = JSON.stringify(data,null,'')

        fs.writeFileSync(path.join(__dirname,'../public/data/paymentData.json'),dataJSON);

        res.redirect('paymentMethod')
    }
};
module.exports = productController;