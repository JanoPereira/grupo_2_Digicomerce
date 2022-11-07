const db = require('../database/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const productsWithDiscount = async () =>{
    try {
        let discountedProducts = await db.Product.findAll({
            include: [
                'images'
            ],
            where:{
                discount: {[Op.gt]: 0}
            }
        });
        
        let count = 0;
        let displayedProducts =[];
        while (count < 4) {
            let random = discountedProducts[Math.floor(Math.random() * discountedProducts.length)];
            if(!displayedProducts.includes(random)){
                displayedProducts.push(random)
                count++;
            }
              
        }
       return displayedProducts;

    } catch (error) {
        console.log(error)
        return res.send(error);
    }
}
const getFeaturedProducts = async() =>{
    try {
        let featuredProducts = await db.Product.findAll({
            include:[
                'images'
            ],
            where:{
                featured:1
            }
        });
        // return (featuredProducts)
        let count = 0;
        let displayedProducts =[];
        while (count < 4) {
            let random = featuredProducts[Math.floor(Math.random() * featuredProducts.length)];
            if(!displayedProducts.includes(random)){
                displayedProducts.push(random)
                count++;
            }
              
        }
        return displayedProducts;

    } catch (error) {
        console.log('getFeaturedProductsError'+error)
        return res.send(error);
    }
    
    
}


const controller = {
    index:async (req,res)=>{
       try {
    
        let discountedProducts = await productsWithDiscount();
        let featuredProducts = await getFeaturedProducts();

        // return res.send(featuredProducts);
        // res.send(discountedProducts);
        res.render('index',{featuredProducts,discountedProducts});

       } catch (error) {
        // console.log("Falle en maincontroller.index" + error);
        return res.send(error);
       }
    },
   
    about: (req,res) =>{
        res.render('about')
    },
    faq: (req,res) =>{
        res.render('faq')
    },
    pago: (req,res)=>{
        res.render('payment')
    }
    
}
module.exports = controller;