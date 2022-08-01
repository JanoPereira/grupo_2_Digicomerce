let fs = require('fs');
let path = require('path');

const productController = {
    productsList: (req,res) => {
        // TODO: falta crear lista de productos //
        res.send('productList')
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