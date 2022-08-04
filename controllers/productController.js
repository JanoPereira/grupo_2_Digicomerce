const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const paymentFilePath = path.join(__dirname, '../data/paymentData.json');
const paymentData = JSON.parse(fs.readFileSync(paymentFilePath, 'utf-8'),{encoding:"utf-8"});
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'),{encoding:"utf-8"});


const productController = {
    productsList: (req,res) => {
        // TODO: falta crear lista de productos //
        res.send(products)
    },

    productTea: (req, res) => {
		const te = products.filter (product => product.category == 'te');
		res.render('teaProduct', { te });
    },

    yerba: (req, res) => {
		const yerbas = products.filter (product => product.category == 'yerba');
		const discountYerbas = yerbas.filter(elem => elem.discount);
        const featuredYerbas = yerbas.filter(elem => elem.featured);
        res.render('yerbas', { yerbas,discountYerbas,featuredYerbas });
    },

    accessories: (req, res) => {
		const accessories = products.filter (product => product.category == 'accesorios');
		const discountAccessories = accessories.filter(elem => elem.discount);
        const featuredAccessories = accessories.filter(elem => elem.featured);
        res.render('accessories', { accessories,discountAccessories,featuredAccessories });
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
        let product = products.find(elem => elem.id == req.params.id)
        res.render('editProduct',{product})
    },

    update: (req,res) => {
        let editedProduct = products.find(elem => elem.id == req.params.id);
        let newData = req.body;
        editedProduct.name = newData.name;
        editedProduct.price = newData.price;
        editedProduct.category = newData.category;
        editedProduct.discount = newData.discount;
        
        res.redirect('/product/productDetail/'+req.params.id)

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
        /* Informacion del form */

        let newData = {
            name: req.body.name,
            lastName:req.body['last-name'],
            adress: req.body.adress,
            city: req.body.city,
            zipCode: req.body['zip-code'],
            email: req.body.email,
            city: req.body.city,
            number: req.body.number,
            delivered: req.body.false
        }; 

//      <-- Agrego id y estado del pedido 

        newData.id = rndInt;            

//      <-- Pusheo los datos del form en el json --> 

        paymentData.push(newData);

//      <-- Vuelvo a convertir el objeto en json y lo re-escribo en el archivo, redirijo la pagina -->

        dataJSON = JSON.stringify(paymentData,null,' ')

        fs.writeFileSync(paymentFilePath,dataJSON);

        res.redirect('paymentMethod')
    }
};


module.exports = productController;