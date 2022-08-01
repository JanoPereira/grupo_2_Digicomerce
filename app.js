const express = require('express');

// const { rmSync } = require('fs');

const path = require('path');
const productController = require('./controllers/productController');

const app = express();

app.use(express.static('./public'));
//app.use(express.static(path.join(__dirname, './public')));//
app.use(express.json());

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'))

const mainRouter = require('./routes/mainRouter')
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')

app.use('/',mainRouter)

app.use('/product', productRouter)

app.use('/user', userRouter)


app.listen(5000,()=>{
    console.log("Se ha inicializado un servidor en http://localhost:5000");
});



