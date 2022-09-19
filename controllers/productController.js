const db = require('../database/models')

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

            let product = await db.Product.findByPk(prodId,{
                include: [
                    'images',
                    'productCategory'
                ]
            })

            let categories = await db.ProductCategory.findAll();

            // return res.send(product);
            res.render('productDetail', { product, categories })

        } catch (error) {
            console.log("Falle en productController.detail: " + error);
            return res.json(error)
        }
    },

    create: async (req, res) => {

        let categories = await db.ProductCategory.findAll()
        res.render('createProduct', { categories })
    },

    upload: async (req, res) => {
        try {
            // return res.send(req.files);
            // let images = 

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

    edit: (req, res) => {
        let product = products.find(elem => elem.id == req.params.id)
        res.render('editProduct', { product })
    },

    update: (req, res) => {
        let editedProduct = products.find(elem => elem.id == req.params.id);

        let images = req.files.length > 0 ? req.files.map(obj => obj.filename) : [];
        images.forEach(elem => editedProduct.images.push(elem));

        editedProduct.name = req.body.name;
        editedProduct.price = +req.body.price;
        editedProduct.category = req.body.category;
        editedProduct.discount = +req.body.discount;
        editedProduct.description = req.body.description;

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
        res.render('deleteProduct', { product });
    },
    deleteProduct: (req, res) => {
        const prodId = req.params.id
        let newList = products.filter(product => product.id != prodId);

        let productsJSON = JSON.stringify(newList, null, ' ')
        fs.writeFileSync(productsFilePath, productsJSON);

        res.redirect('/product')
    }
};


module.exports = productController;