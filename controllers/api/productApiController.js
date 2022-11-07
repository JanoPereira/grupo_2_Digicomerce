const { validationResult } = require('express-validator');
const db = require('../../database/models')

const productController = {
    list: async (req, res) => {
        try {
            let products = await db.Product.findAll({
                include: ['images']
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
            console.log('El error fue en userApiController.list: ' + error);
            return res.json(error);
        }
    },
    detail: async (req, res) => {
        try {
            const productId = req.params.id;

            let product = await db.Product.findByPk(productId,{
                include:['images']
            });
            let images = [];

            // return res.json(product)
            product.images.forEach(image=>{
                images.push(`${req.protocol}://${req.headers.host}/img/products/${image.file_name}`)
            });
            
            
            product = {
                id: product.id,
                name: product.name,
                discount: product.discount,
                description: product.description,
                featured: product.featured,
                price: product.price,
                image: `${req.protocol}://${req.headers.host}/img/products/${product.avatar}`
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
    }
};


module.exports = productController;