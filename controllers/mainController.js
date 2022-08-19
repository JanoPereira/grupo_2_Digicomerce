const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsWithDiscount = () =>{
    let discountedProducts = products.filter(elem=>{
        if (elem.discount >0){
            return {elem}
        }
    })
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
}
const getFeaturedProducts = () =>{
    let featuredProducts = products.filter(elem=>{
        if (elem.featured){
            return {elem}
        }
    })
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
    
    
}


const controller = {
    index:(req,res)=>{
        let discountedProducts = productsWithDiscount();
        let featuredProducts = getFeaturedProducts();
        // res.send(featuredProducts);
        res.render('index',{featuredProducts,discountedProducts});
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