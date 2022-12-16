const { validationResult } = require('express-validator');
const db = require('../../database/models');
const Order = require('../../database/models/Order');

const productController = {
    list: async (req, res) => {

        try {
            const limit = parseInt(req.query.limit) || undefined;
            const offset = parseInt(req.query.offset) || undefined;

            // return res.send(limit)
            let products = await db.Product.findAll({
                include: ['images', 'productCategory'],
                limit,
                offset

            }); //[{id,name,password,email,categories,avatar,}]
            let categories = await db.ProductCategory.findAll({
                include: ['products']
            });


            return res.status(200).json({ //status
                meta: {
                    status: 200,
                    total: products.length,
                    url: 'api/product'
                },
                categories,
                count: products.length,
                products
            });
        } catch (error) {
            console.log('El error fue en productApiController.list: ' + error);
            return res.json(error);
        }
    },
    detail: async (req, res) => {
        try {
            const productId = req.params.id;

            let product = await db.Product.findByPk(productId, {
                include: ['images']
            });
            let images = [];

            // return res.json(product)
            product.images.forEach(image => {
                images.push(`${req.protocol}://${req.headers.host}/img/products/${image.file_name}`)
            });


            product = {
                id: product.id,
                name: product.name,
                discount: product.discount,
                description: product.description,
                featured: product.featured,
                price: product.price,
                image: images[0]
            }
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: product.length,
                    url: 'api/product'
                },
                images,
                product
            })
        } catch (error) {
            console.log('El error fue en productApiController.detail: ' + error);
            return res.json(error);
        }
    },
    checkout: async (req, res) => { //Agarra los datos del body, arma la orden
        try {
            const {paymentMethod,name,lastName,phone,address,city,zipCode,total,orderItems} = req.body;
            // return res.json({body:req.body})
            // console.log(req.session.userLogged);
            const order = await db.Order.create({
                users_id: req.session.userLogged.id,
                payment_methods_id: paymentMethod,
                name,
                last_name: lastName,
                phone,
                address,
                city,
                zip_code: zipCode,
                total,
                orderItems
            }, {
                include: ['orderItems'] //Asi, puedo subir datos a 2 tablas distintas relacionadas a la vez
            });

            return res.json({
                ok: true,
                meta: {
                    status: 200,
                    url: 'api/product/checkout'
                },
                order
            });

        } catch (error) {
            console.log('El error fue en productApiController.checkout: ' + error);
            return res.json(error);
        }
    },
    addTempItem: async(req,res) =>{
        try {
            let {tempCartId, prodId} = req.body;

            let tempItem = await db.TemporalItem.create({
                temporal_carts_id : tempCartId,
                products_id: prodId,
                quantity: 1
            });

            return res.json({
                ok: true,
                meta: {
                    status: 200,
                    url: `api/product/addTempItem`
                },
                tempItem
            });

            
        } catch (error) {
            console.log('El error fue en productApiController.addTempItem: ' + error);
            return res.json(error);
        }
    },
    updateTempItems: async (req,res) =>{
        try {
            let cart = req.body;
            for (let index = 0; index < cart.length; index++) { //Voy por cada item, y lo updateo (solo quantity cambia)
                let item = cart[index];
                await db.TemporalItem.update({
                    quantity:item.quantity
                },{
                    where: {
                        id: item.id
                    }
                })
                
            };
            return res.json({
                ok: true,
                meta: {
                    status: 200,
                    url: `api/product/updateTempItems`
                }
            });
        } catch (error) {
            console.log('El error fue en productApiController.updateTempItems: ' + error);
            return res.json(error);
        }
    },
    deleteTempItem: async (req,res) =>{
        try {
            let prodId = req.body.prodId;
            await db.TemporalItem.destroy({
                where: {
                    products_id: prodId
                }
            })
            return res.json({
                ok: true,
                meta: {
                    status: 200,
                    url: `api/product/deleteTempItem`
                }
            });
        } catch (error) {
            console.log('El error fue en productApiController.deleteTempItem: ' + error);
            return res.json(error);
        }
    }

};


module.exports = productController;
