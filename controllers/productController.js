const { validationResult } = require('express-validator');
const db = require('../database/models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const productController = {
    showProducts: async (req, res) => {
        try {
            let selectedProducts = await db.Product.findAll({
                include: [
                    'images'
                ],
                where: {
                    products_categories_id: req.params.category
                }
            });
            // return res.send(selectedProducts);


            let discountSelectedProducts = selectedProducts.filter(elem => elem.discount);

            let featuredSelectedProducts = selectedProducts.filter(elem => elem.featured);
            res.render('productList', { selectedProducts, discountSelectedProducts, featuredSelectedProducts });

        } catch (error) {
            console.log('falle en productController.showProducts' + error)
            return res.send(error)
        }

    },

    cart: (req, res) => {
        res.render('productCart')
    },

    detail: async (req, res) => {
        try {
            prodId = req.params.id;
            let relatedProducts= [] ;
            let count = 0;
            let product = await db.Product.findByPk(prodId, {
                include: [
                    'images',
                    'productCategory'
                ]
            });

            let sameCategoryProducts = await db.Product.findAll({
                where: {
                    products_categories_id: product.products_categories_id,
                    id: {[Op.ne]: product.id}
                },
                include: ['images']
            });

            while (count < 3) {
                let random = sameCategoryProducts[Math.floor(Math.random() * sameCategoryProducts.length)];
                if(!relatedProducts.includes(random)){
                    relatedProducts.push(random)
                    count++;
                }
                  
            }
            //  return res.send(relatedProducts)

            

            // return res.send(product);
            res.render('productDetail', { product, relatedProducts })

        } catch (error) {
            console.log("Falle en productController.detail: " + error);
            return res.json(error)
        }
    },

    create: async (req, res) => {

    
        res.render('createProduct')
    },
    search: async(req,res)=>{
        try {
            let search = req.query.search;
            let searchedProducts = await db.Product.findAll({
                where: {
                    name: {[Op.like]: `%${search}%`}
                },
                include: ['images']
            });
            if(!searchedProducts.length){
                return res.render('notFound'); //TODO: Armar vista
            };

            return res.render('searchList', {searchedProducts, string: search});

        } catch (error) {
            console.log("Falle en productController.detail: " + error);
            return res.json(error)
        }
    },

    upload: async (req, res) => {
        try {
            // return res.send(req.files);
            // let images = 
            
            let errors = validationResult(req)
            if (!errors.isEmpty()) {
                let oldData = {
                    name: req.body.name,
                    price: +req.body.price,
                    discount: req.body.discount,
                    products_categories_id: req.body.category,
                    description: req.body.description,
                    featured: req.body.featured
                }
                // return res.send(errors);
                errors = errors.mapped();
                return res.render('createProduct', {oldData, errors});
            }
            // return res.send(errors)
            let newProduct = {
                name: req.body.name,
                price: +req.body.price,
                discount: req.body.discount,
                products_categories_id: req.body.category,
                description: req.body.description,
                featured: req.body.featured
            };

            let productDb = await db.Product.create(newProduct); // Guardo el nuevo producto que cree  

            // return res.send(req.files);

            let productImages = req.files.length > 0 ? req.files.map(obj => {
                return {
                    file_name: obj.filename,
                    products_id: productDb.id
                };
            }) : [{
                file_name: "default.PNG",
                products_id: productDb.id
            }];

            // return res.send(productImages);

            await db.Image.bulkCreate(productImages);


            //bulk create

            res.redirect('/product/product-detail/' + productDb.id)
        } catch (error) {
            console.log('falle en prodctcontroller.upload');
            return res.json(error);
        }

    },

    edit: async (req, res) => {
        try {
            let product = await db.Product.findByPk(req.params.id, {
                include: [
                    'images',
                    'productCategory'
                ]
            });
            
            res.render('editProduct', { product });
        } catch (error) {
            console.log('falle en prodctcontroller.edit: ' + error);
            return res.json(error);
        }
    },

    update: async (req, res) => {
        try {
            let editedProduct = await db.Product.findByPk(req.params.id);

            let images = req.files.length > 0 ? req.files.map(obj => {
                return {
                    file_name: obj.filename,
                    products_id: editedProduct.id
                };
            }) : null;
            images ? await db.Image.bulkCreate(images) : null;
            await db.Product.update({
                name: req.body.name,
                price: +req.body.price,
                products_categories_id: +req.body.category,
                discount: +req.body.discount,
                description: req.body.description
            }, {
                where: {
                    id: editedProduct.id
                }
            });

            return res.redirect(`/product/product-detail/${editedProduct.id}`)

        } catch (error) {
            console.log('falle en prodctcontroller.update: ' + error);
            return res.json(error);
        }

    },

    checkout: async(req, res) => {
        try {
            let paymentMethods = await db.PaymentMethod.findAll();
            res.render('checkout',{paymentMethods})
        } catch (error) {
            console.log('falle en prodctcontroller.checkout: ' + error);
            return res.json(error);
        }
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
    delete: async (req, res) => {
        try {
            prodId = req.params.id;
            let product = await db.Product.findByPk(prodId,{
                include:['images']
            });
            res.render('deleteProduct', { product });
        } catch (error) {
            console.log('falle en prodctcontroller.delete: ' + error);
            return res.json(error);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const prodId = req.params.id
            await db.Product.destroy({
                where: {
                    id: prodId
                }
            });

            res.redirect('/')
        } catch (error) {
            console.log('falle en prodctcontroller.deleteProduct: ' + error);
            return res.json(error);
        }
    }
};


module.exports = productController;