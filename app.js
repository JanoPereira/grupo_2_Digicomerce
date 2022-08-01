const express = require('express');

const fs = require('fs');

const path = require('path');

const app = express();


app.use(express.static('./public'));
//app.use(express.static(path.join(__dirname, './public')));//
app.use(express.json());

app.set('view engine','ejs');

//<-- Capturar todo lo que venga del form-->//

app.use(express.urlencoded({extended:false}));

app.use(express.json());

// <--Metodo Override (put y delete) --> // en el form --> action= "/../..(?_method=PUT || ?_method=DELETE)"

const methodOverride = require ("method-override");

app.use (methodOverride('_method'))

// <-- Declaracion Rutas --> //

const mainRouter = require('./routes/mainRouter')
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')

// <-- Envio de Diferentes Rutas -->//

app.use('/',mainRouter)

app.use('/product', productRouter)

app.use('/user', userRouter)



// <-- Iniciar Servidor --> //

app.listen(5000,()=>{
    console.log("Se ha inicializado un servidor en http://localhost:5000");
});

// <-- ERROR 404 --> //

app.use((req,res,next)=>{
    res.status(404).render('not-found'); /* TODO: Armar vista not-found */
})


