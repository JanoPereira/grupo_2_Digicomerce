const productController = {
    productsList: (req,res) => {
        // TODO: falta crear lista de productos //
        res.send('productList')
    },

    productTea: (req,res) =>{
        res.render('teaProduct')
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
    }
};
module.exports = productController;