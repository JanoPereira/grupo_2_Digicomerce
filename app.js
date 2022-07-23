const express = require('express');

// const { rmSync } = require('fs');

const path = require('path');

const app = express();

app.use(express.static('./public'));

app.set('view engine','ejs');

const mainRouter = require('./routes/mainRouter')

app.use('/',mainRouter)


app.listen(5000,()=>{
    console.log("Se ha inicializado un servidor en http://localhost:5000");
});



