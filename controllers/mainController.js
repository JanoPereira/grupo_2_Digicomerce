const controller = {
    index:(req,res)=>{
        res.render('index')
    },
    carro:(req,res) =>{
        res.render('productCart')
    },
    about: (req,res) =>{
        res.render('about')
    },
    registro: (req,res) =>{
        res.render('registrationForm')
    },
    faq: (req,res) =>{
        res.render('faq')
    },
    login: (req,res) =>{
        res.render('loginForm')
    },
    detail: (req,res) =>{
        res.render('productDetail')
    },
    userInfo: (req,res)=>{
        res.render('infoUsuario')
    },
    pago: (req,res)=>{
        res.render('pago')
    }
    
}
module.exports = controller;