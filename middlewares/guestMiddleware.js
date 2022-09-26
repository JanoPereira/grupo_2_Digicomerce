const guestMiddleware = function (req,res,next) {
    if(!req.session.userLogged){
        return res.redirect('/user/registration-form')
    }
    next();
};

module.exports=guestMiddleware;