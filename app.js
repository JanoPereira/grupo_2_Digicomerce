const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('public'));

app.listen(5000,()=>{
    console.log("Se ha inicializado un servidor en http://localhost:5000")

})
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./views/index.html'))
})
app.get('/carro-compras',(req,res)=>{
    res.sendFile(path.join(__dirname,'./views/productCart.html'))
})