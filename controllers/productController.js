const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const paymentFilePath = path.join(__dirname, '../data/paymentData.json');
const paymentData = JSON.parse(fs.readFileSync(paymentFilePath, 'utf-8'), { encoding: "utf-8" });
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'), { encoding: "utf-8" });


const productController = {
    productsList: (req, res) => {
        // TODO: falta crear lista de productos //
        res.send(products)
    },
    showProducts: (req,res)=>{
        let category = req.params.category;
          
        if (category=='tes'){
            const selectedProducts = products.filter(product => product.category == 'te');
            const discountSelectedProducts = selectedProducts.filter(elem => elem.discount);
            const featuredSelectedProducts = selectedProducts.filter(elem => elem.featured);
            res.render('productList', { selectedProducts, discountSelectedProducts, featuredSelectedProducts });

        } else if(category=='yerbas'){
            const selectedProducts = products.filter(product => product.category == 'yerba');
            const discountSelectedProducts = selectedProducts.filter(elem => elem.discount);
            const featuredSelectedProducts = selectedProducts.filter(elem => elem.featured);
            res.render('productList', { selectedProducts, discountSelectedProducts, featuredSelectedProducts });
            
        }else if(category == "accesorios"){
            const selectedProducts = products.filter(product => product.category == 'accesorios');
            const discountSelectedProducts = selectedProducts.filter(elem => elem.discount);
            const featuredSelectedProducts = selectedProducts.filter(elem => elem.featured);
            res.render('productList', { selectedProducts, discountSelectedProducts, featuredSelectedProducts });
        }
        
    },

    // productTea: (req, res) => {
    //     const te = products.filter(product => product.category == 'te');
    //     res.render('teaProduct', { te });
    // },

    // yerba: (req, res) => {
    //     const yerbas = products.filter(product => product.category == 'yerba');
    //     const discountYerbas = yerbas.filter(elem => elem.discount);
    //     const featuredYerbas = yerbas.filter(elem => elem.featured);
    //     res.render('yerbas', { yerbas, discountYerbas, featuredYerbas });
    // },

    // accessories: (req, res) => {
    //     const accessories = products.filter(product => product.category == 'accesorios');
    //     const discountAccessories = accessories.filter(elem => elem.discount);
    //     const featuredAccessories = accessories.filter(elem => elem.featured);
    //     res.render('accessories', { accessories, discountAccessories, featuredAccessories });
    // },

    cart: (req, res) => {
        res.render('productCart')
    },

    detail: (req, res) => {
        prodId = req.params.id;
       let product = products.find(product => product.id == prodId)
        res.render('productDetail',{product})
    },

    create: (req, res) => {
        res.render('createProduct')
    },

    upload: (req, res) => {
        // res.send(req.files);
        
        let images = req.files.length>0 ? req.files.map(obj=>obj.filename) : ["default.PNG"];
        
        let newProduct = {
            id: products[products.length - 1].id + 1,
            name: req.body.name,
            price: +req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description,
            images,
            featured: req.body.featured,
            active: true
        };
        products.push(newProduct);
        let productsJSON = JSON.stringify(products, null, ' ')
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect('/product/product-detail/' + newProduct.id)

    },

    edit: (req, res) => {
        let product = products.find(elem => elem.id == req.params.id)
        res.render('editProduct', { product })
    },

    update: (req, res) => {
        let editedProduct = products.find(elem => elem.id == req.params.id);
        let productIndex = products.indexOf(editedProduct);
        let images = req.files.length>0 ? req.files.map(obj=>obj.filename) : [];
        images.forEach(elem=>products[productIndex].images.push(elem));
        products[productIndex].name = req.body.name;
        products[productIndex].price = +req.body.price;
        products[productIndex].category = req.body.category;
        products[productIndex].discount = +req.body.discount;
        products[productIndex].description = req.body.description;
        
        let productsJSON = JSON.stringify(products, null, ' ')
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect('/product/product-detail/' + req.params.id)

    },

    paymentDetail: (req, res) => {
        res.render('paymentDetail')
    },

    paymentMethod: (req, res) => {
        res.render('paymentMethod')
    },

    savePaymentDetail: (req, res) => {
        // res.send(req.body);
        const rndInt = Math.floor(Math.random() * 1000) + 1; /* Numero Random entre 1-1000 */
        /* Informacion del form */

        let newData = {
            name: req.body.name,
            lastName: req.body['last-name'],
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

        dataJSON = JSON.stringify(paymentData, null, ' ')

        fs.writeFileSync(paymentFilePath, dataJSON);

        res.redirect('payment-method')
    },
    delete: (req, res) => {
        prodId = req.params.id;
        let product = products.find(product => product.id == prodId)
        res.render('deleteProduct', {product});
    },
    deleteProduct: (req, res) => {
        const prodId = req.params.id
        let newList = products.filter(product => product.id !== prodId);

       let productsJSON = JSON.stringify(newList, null, ' ')
        fs.writeFileSync(productsFilePath, productsJSON);
        
        res.redirect('/product')
    }
};


module.exports = productController;