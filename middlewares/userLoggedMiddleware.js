const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));


const userLogged = (req,res,next) =>{
    
    res.locals.isLogged=false;

    let emailInCookie = req.cookies.userEmail;

    let userInCookie = users.find(user=>user.email==emailInCookie);
    // console.log(userInCookie)
    
    // if(userInCookie){
    //     req.session.userLogged = userInCookie; //SESSION SIEMPRE EN REQ 
    // } TODO: PREGUNTAR SI ESTO ES REDUNDANTE
    
    
    if(req.session && req.session.userLogged){
        res.locals.isLogged=true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();

}

module.exports=userLogged;