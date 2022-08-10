const fs = require('fs');
const path = require('path');
const { resourceLimits } = require('worker_threads');

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));


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
        let newUser = {
            
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password, 
            id: users[users.length - 1].id + 1,
            active: true
        };
        users.push(newUser);
        let usersJSON = JSON.stringify(users, null, ' ');
        fs.writeFileSync(usersFilePath, usersJSON);
        res.redirect('loginForm');
    }
   
}
module.exports = userController;