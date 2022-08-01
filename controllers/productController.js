const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const paymentFilePath = path.join(__dirname, '../data/paymentData.json');
const paymentData = JSON.parse(fs.readFileSync(paymentFilePath, 'utf-8'),{encoding:"utf-8"});
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'),{encoding:"utf-8"});

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
        // prodId=req.params.id;
        // products.find()
        res.render('productDetail')
    },
    create: (req,res) => {
        res.render('createProduct')
    },
    edit: (req,res) => {
        res.render('editProduct')
    },
    update: (req,res) => {
        // res.render('editProduct') TODO: ACTUALIZAR DATOS DEL PRODUCTO
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

        let newData = req.body; /* Informacion del form */

//      <-- Agrego id y estado del pedido 

        newData.id = rndInt;            
        newData.delivered = false;

//      <-- Pusheo los datos del form en el json --> 

        paymentData.push(newData);

//      <-- Vuelvo a convertir el objeto en json y lo re-escribo en el archivo, redirijo la pagina -->

        dataJSON = JSON.stringify(paymentData,null,'\n')

        fs.writeFileSync(paymentFilePath,dataJSON);

        res.redirect('paymentMethod')
    }
};


module.exports = productController;