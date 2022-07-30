let total= 0;
let products = [];

function add (product,price) {
    console.log(product,price);
    total = total + price;
    products.push(product);
    document.getElementById('precio-total-carro').innerHTML=`$${total}`;
}

const pay = ()=>{
    window.alert(products.join(', \n'))
}
