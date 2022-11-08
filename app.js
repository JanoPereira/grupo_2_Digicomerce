const express = require('express');

const fs = require('fs');

const path = require('path');

const cors = require('cors');

const app = express();




const cookieParser = require('cookie-parser');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const headerMiddleware = require('./middlewares/headerMiddleware');


const session = require("express-session");

app.use(cors());

app.use(session({ 
    secret: "Conf middleware global session",
    resave: false,
    saveUninitialized: false 
}));



app.use(cookieParser()); 

app.use(userLoggedMiddleware);

app.use(headerMiddleware);





//app.use(express.static(path.join(__dirname, './public')));//
app.use(express.static('./public'));

app.set('view engine','ejs');

//<-- Capturar todo lo que venga del form (body)-->//

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// <--Metodo Override (put y delete) --> // en el form --> action= "/../..(?_method=PUT || ?_method=DELETE)"

const methodOverride = require("method-override");

app.use(methodOverride('_method'))



// <-- Declaracion Rutas --> //

const mainRouter = require('./routes/mainRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const userApiRouter = require('./routes/api/userApiRouter');
const productApiRouter = require('./routes/api/productApiRouter');

// <-- Envio de Diferentes Rutas -->//

app.use('/',mainRouter);

app.use('/product', productRouter);

app.use('/user', userRouter);

app.use('/api/user',userApiRouter);

app.use('/api/product',productApiRouter)

//COOKIE-PARSER



// <-- Iniciar Servidor --> //

app.listen(7000,()=>{
    console.log("Se ha inicializado un servidor en http://localhost:7000");
});
app.get('/borrar',(req,res)=>{
    res.render('borrar')
})

// <-- ERROR 404 --> //

app.use((req,res,next)=>{
    res.status(404).render('page404'); /* TODO: Armar vista not-found */
})


