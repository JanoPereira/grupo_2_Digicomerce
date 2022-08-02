const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsWithDiscount = () =>{
    let discountedProducts = products.filter(elem=>{
        if (elem.discount >0){
            return {id:elem.id , discount:elem.discount}
        }
    })
    let count = 0;
    let displayedProducts =[];
    while (count < 4) {
        let random = discountedProducts[Math.floor(Math.random() * discountedProducts.length)];
        displayedProducts.push(random)
        count++;  
    }
   
    return displayedProducts;
    
    
}


const controller = {
    index:(req,res)=>{
        let discountedProducts = productsWithDiscount();
        // res.send(discountedProducts);
        res.render('index',{products,discountedProducts});
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