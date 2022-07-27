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
    }
};
module.exports = productController;