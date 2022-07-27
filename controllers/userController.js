const userController = {
    userInfo: (req,res) =>{
        // TODO : crear pagina de usuario //
        res.send('userInfo')
    },
    register: (req,res) =>{
        res.render('registrationForm')
    },
    login: (req,res) =>{
        res.render('loginForm')
    },
   
}
module.exports = userController;