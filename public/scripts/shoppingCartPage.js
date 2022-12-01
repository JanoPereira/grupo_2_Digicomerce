window.addEventListener('load', () => {
    const cart = localStorage.carrito ? JSON.parse(localStorage.getItem('carrito')) : undefined;
    let productsContainer = document.querySelector('.contenedor-articles');
    let buyResumeContainer = document.querySelector('.contenedor-resumen-compra');

    if (cart) {
        inyectProducts(cart);
        inyectBuyResume();
        listenButtons();
    } else {
        productsContainer.innerHTML = `No tenes ningun producto agregado al carro de compras`
    }


    function inyectProducts(products) {//Funcion que inyecta los productos en la lista del carro
        
        productsContainer.innerHTML ='';
        products.forEach(prod => {
            productsContainer.innerHTML +=
                `
                <article class="producto">
                    <div class="flex-item contenedor-imagen-producto">
                        <img src="${prod.image}" alt="foto-producto" class="foto-producto">
                    </div>
                    <div class="flex-item informacion-producto">
                        <div class="flex-item contenedor-descripcion-producto">
                            <h4 class="nombre-producto">${prod.name}</h4>
                            <p class="descripcion-producto">${prod.description}</p>
                        </div>          
                        <div class="flex-item contenedor-precio-producto">
                            <p class="precio-parcial-producto">$${prod.price - (prod.price * prod.discount / 100)}</p>
                        </div>
                        <div class="contenedor-input">
                            <input type="number" class="flex-item cantidad-producto" data-id="${prod.id}" value="${prod.quantity}">
                        </div>
                        <div class="contenedor-subtotal flex-item">
                            <p class="precio-subtotal">$${(parseFloat((prod.quantity * (prod.price - (prod.price * prod.discount / 100))))).toFixed(2)}</p>
                        </div>
                    </div>
                    
                    <div class="contenedor-basura ">
                        <i class="fa-solid fa-trash" data-id="${prod.id}"></i>
                    </div>
                </article>`
        });
    }

    function inyectBuyResume() { //Funcion que inyecta el precio en el resumen de compra
        let totalPriceCart = document.getElementById('total-price-cart');
        let totalProducts = document.querySelector('.products-amount');
        let productAmount = getTotalProducts();
        let subtotalPrice = getTotalPrice();
        totalPriceCart.innerHTML = subtotalPrice;
        totalProducts.innerHTML = productAmount;
        let taxPrice = parseInt((subtotalPrice * 0.21).toFixed(2));
        let totalPrice = subtotalPrice + 400 + taxPrice;

        buyResumeContainer.innerHTML =
            `
            <div class="contenedor-resumen-fixed">
                    <p class="confirmacion-compra">Confirmacion de la compra</p>
                    <div class="contenedor-datos-finales">
                        <p class="cantidad-productos">Productos (${productAmount}):</p>
                        <p class="precio">$${subtotalPrice}</p>
                        <p class="Envio">Envio:</p>
                        <p class="precio precio-envio">$400</p>
                        <p class="subtotal">Subtotal:</p>
                        <p class="precio subtotal-price">$${subtotalPrice + 400}</p>
                        <p class="impuestos">IVA (21%):</p>
                        <p class="precio tax-price">$${taxPrice}</p>
                        <div class="contenedor-total-pedido">
                            <p id="total-pedido">Total del pedido:</p>
                            <p class="precio" id="precio-total">$${totalPrice}</p>
                        </div>
                        <div class="contenedor-botones-pago">
                            <a href="#" class="continuar-compra">Continuar comprando <i class="fa-solid fa-store"></i></a>
                            <a href="/product/product-cart/payment-detail" class="boton-pago">Proceder al pago <i class="fa-solid fa-credit-card"></i></a>
                        </div>
                    </div>
            </div>
        `
    }
    function listenButtons(){
        const quantityButtons = document.querySelectorAll('.cantidad-producto');
        const deleteButtons = document.querySelectorAll('.fa-trash');
        quantityButtons.forEach(btn=>{//Voy por cada boton, si se cambia tengo que cambiarlo en el array
            btn.addEventListener('input',(e)=>{
                const newQuantity = btn.value;
                const prodId = e.target.dataset.id;
                let cartIndex = cart.findIndex(product => product.id == prodId);
                cart[cartIndex].quantity = newQuantity;
                localStorage.setItem('carrito',JSON.stringify(cart))
                inyectProducts(cart);
                inyectBuyResume();
                listenButtons()
            });
        })
        deleteButtons.forEach(btn=>{ //Voy por cada boton, si apretan es que lo sacan del carro 
            btn.addEventListener('click',(e)=>{
                const prodId = e.target.dataset.id;
                let cartIndex = cart.findIndex(product => product.id == prodId);
                cart.splice(cartIndex,1);
                console.log(cart);
                localStorage.setItem('carrito',JSON.stringify(cart))
                inyectProducts(cart);
                inyectBuyResume();
                listenButtons()
            })
        })
    }
});

function getTotalPrice() {
    // Yo se que si o si voy a tener un carrito, porque esta funcion se invoca despues de que hice la funcion add()
    let cart = JSON.parse(localStorage.getItem('carrito')); //Obtengo el carrito
    const total = cart.reduce((acum, value) => {//va por cada objeto dentro de carrito y suma quantity * total
        return acum = acum + (value.quantity * (parseInt(value.price) - parseInt(value.price) * value.discount / 100));
    }, 0);
    return parseFloat(total.toFixed(2))
}
function getTotalProducts() {
    let cart = JSON.parse(localStorage.getItem('carrito'));
    return cart.length;
}


