const bcrypt = require('bcryptjs');

const db = require('../database/models');

const fs = require('fs');

const path = require('path');

const { validationResult } = require('express-validator');

const userController = {
    userInfo: async (req, res) => {
        try {
            let user = await db.User.findOne({
                where:{
                    email: req.session.userLogged.email
                },
                
                include: [
                    'userCategory'
                ]
            });
            // return res.send(user);
            res.render('userProfile',{user});
        } catch (error) {
            console.log("Falle en userController.userInfo: " + error); 
            return res.json(error);
        }
    },
    edit: async (req,res) =>{
        try {
            let user = await db.User.findByPk(req.params.id,{
                include:  [
                    'userCategory'
                ]
            });
            return res.render('userEdit', {user})
        } catch (error) {
            console.log("Falle en userController.edit: " + error); 
            return res.json(error);   
        }
    },
    update: async(req,res)=>{
        try { 
            
            // return res.send(req.body)
            let user = await db.User.findByPk(req.params.id);
            let errors = validationResult(req)
            if(!errors.isEmpty()){
                errors = errors.mapped()

                let oldData = {
                    name: req.body.name,
                    avatar: req.file ? req.file.filename : '',
                    email: req.body.email,
                    number: req.body.number
                };
                
                return res.render('userEdit', {user, errors, oldData})
            }
            let updatedData = {
                name: req.body.name,
                avatar: req.file ? req.file.filename : user.avatar,
                email: req.body.email.toLowerCase(),
                phone_number: +req.body.number,
            };
            req.body.password? updatedData.password = bcrypt.hashSync(req.body.password,10): null;

            await db.User.update(updatedData,{
                where: {
                    id: user.id
                }
            });
            return res.redirect('/user/profile');
            
        } catch (error) {
            console.log("Falle en userController.update: " + error); 
            return res.json(error);  
        }
    },
    register: (req, res) => {
        res.render('registrationForm')
    },
    login: (req, res) => {
        res.render('loginForm')
    },
    processLogin: async (req, res) => {
        // let errors = validationResult(req);
        try {

            let userData = req.body;

            let userToLog = await db.User.findOne({ where: { email: userData.email } });

            if (userToLog) {

                if (bcrypt.compareSync(userData.password, userToLog.password)) {

                    delete userToLog.password; // Para no llevar la password session 

                    req.session.userLogged = userToLog; //Defino en sessions al usuario loggeado

                    if (req.body.recordar) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 }) //1 hora
                    }; //Creo cookie si el usuario tilda en la casilla 'recordar'

                    return res.redirect('/');
                }
                return res.render("loginForm", { errors: { password: { msg: "constraseña incorrecta" } }, oldDataLogin: userToLog.email });
            }
            return res.render("loginForm", { errors: { email: { msg: "Email incorrecto" } } });
        } catch (error) {

            console.log('falle en usercontroller.proccesLogin');
            return res.send(error);
        }

    },
    uploadUser: async (req, res) => {
        try {
            let errors = validationResult(req);
            
            if (!errors.isEmpty()) {

                errors = errors.mapped();

                let oldData = {
                    name: req.body.name,
                    avatar: req.file ? req.file.filename : '',
                    email: req.body.email,
                    number: req.body.number
                };
            
            req.file?fs.unlinkSync(path.join(__dirname, '../public/img/users/' + req.file.filename)):null;
                
                return res.render('registrationForm', { errors, oldData });
            };

            let newUser = {
                name: req.body.name,
                avatar: req.file ? req.file.filename : 'default.jpg',
                email: req.body.email.toLowerCase(),
                phone_number: +req.body.number,
                password: bcrypt.hashSync(req.body.password, 10),//encripta la password ingresada
                users_categories_id: 2
            };

            await db.User.create(newUser);


            res.redirect('/user/login-form');

        } catch (error) {

            console.log('falle en usercontroller.upload' + error);
            return res.send(error);

        };

    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
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