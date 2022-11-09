const db = require('../database/models');

const userLogged = async (req, res, next) => {

    try {
        
        res.locals.isLogged = false;
        
        let emailInCookie = req.cookies.userEmail;
        
    
        let userInCookie = await db.User.findOne({
            where:{
                email: emailInCookie ? emailInCookie:''
            }
        });
        

        if (userInCookie) {
            req.session.userLogged = userInCookie; //SESSION SIEMPRE EN REQ 
        };

        if (req.session && req.session.userLogged) {
            let user = await db.User.findByPk(req.session.userLogged.id)
            res.locals.isLogged = true;
            res.locals.userLogged = user;
        };
        return next();

    } catch (error) {
         
        console.log('Falle en userLoggedMiddleware: '+error);
        return res.send(error)
    }
}

module.exports = userLogged;