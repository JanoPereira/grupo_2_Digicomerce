const fs = require('fs');
const path = require('path');
const { resourceLimits } = require('worker_threads');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/usersData.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const {validationResult} = require('express-validator');


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
    processLogin: (req, res) => {
        let errors = validationResult(req);
        let userData = req.body;
        if (!errors.isEmpty()) {
            let errorObject = errors.mapped()
            let oldDataLogin = {
                email: req.body.email,
            };
            res.render('loginForm', { errors: errorObject, oldDataLogin });
        } 
        
        if (errors.isEmpty()) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == userData.email) {
                    if (bcrypt.compareSync(userData.password, users[i].password)) {
                        let usuarioALogearse = users[i];
                        break;
                    }
                }
            }
            if (usuarioALogearse == undefined) {
                return res.render("login", { errors: [{ msg: "Credenciales inválidas" }] });
            }
            req.session.usuarioLogueado = usuarioALogearse;
           
        }

        res.redirect("/"); 

        
        
    },
    uploadUser: (req, res) => {
        let errors = validationResult(req);
        // return res.send (errors.mapped());
        let newUser = {
            
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            number: +req.body.number,
            password: bcrypt.hashSync(req.body.password, 10), //encripta la password ingresada
            id: users[users.length - 1].id + 1,
            active: true
        };
        if(!errors.isEmpty()) {
            let errorObject = errors.mapped()
            // return res.send(errorObject);
            let oldData = {
                name: req.body.name,
                email: req.body.email,
                number: req.body.number
            };
            return res.render ('registrationForm', {errors:errorObject, oldData});
        };
        users.push(newUser);
        let usersJSON = JSON.stringify(users, null, ' ');
        fs.writeFileSync(usersFilePath, usersJSON);
        res.redirect('/user/login-form');
    }
   
}
module.exports = userController;


// const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.send(errors.array());
//         }
//         req.session.email = req.body.email;
//         req.session.age = req.body.age;
//         req.session.name = req.body.name;
//         req.session.color = req.body.color;

//         res.redirect('/');