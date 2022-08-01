const userController = {
    userInfo: (req,res) =>{
        // TODO : crear pagina de usuario //
        res.send('myAccount')
    },
    register: (req,res) =>{
        res.render('registrationForm')
    },
    login: (req,res) =>{
        res.render('loginForm')
    },
    uploadUser: (req,res) =>{
        let userInfo = req.body;
        res.render('loginForm')
    }
   
}
module.exports = userController;