const express = require('express');
const path = require('path');
const app = express();
//app.use(express.static('./public'));

const pathPublic = path.resolve(__dirname, './public');
app.use(express.static(pathPublic));



app.get ('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'./views/index.html'));
});

app.get ('/carro-compras',(req, res)=>{
    res.sendFile(path.join(__dirname,'./views/productCart.html'));
});

app.get ('/about',(req, res)=>{
    res.sendFile(path.join(__dirname,'./views/about.html'));
});

app.get('/formulario-registro', (req, res) => {
    res.sendFile(path.join(__dirname, './views/registrationForm.html'));
});


app.listen(5000,()=>{
    console.log("Se ha inicializado un servidor en http://localhost:5000");
});



