const productController = {
    productsList: (req,res) => {
        // TODO: falta crear lista de productos //
        res.send('listaDeProductos')
    },
    cart:(req,res) =>{
        res.render('productCart')
    },
    detail: (req,res) =>{
        res.render('productDetail')
    },
    create: (req,res) => {
        // TODO: falta crear pagina creacion producto //
        res.send('creacionProducto')
    },
    edit: (req,res) => {
        // TODO: falta crear edicion de producto //
        res.send('edicionDeProductos')
    }
}
module.exports = productController;