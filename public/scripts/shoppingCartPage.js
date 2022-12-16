import utils from './utils.js';

window.addEventListener('load', async () => {
    try {
        let userLoggedId = document.getElementById('user-logged-id').innerText;
        let userLogged = (await (await fetch('http://localhost:7000/api/user/' + userLoggedId)).json()).user;
        const cart = userLogged?.temporalCart;
        let productsContainer = document.querySelector('.contenedor-articles');
        let buyResumeContainer = document.querySelector('.contenedor-resumen-compra');

        if (cart) {
            inyectProducts(cart.temporalItems);
            await inyectBuyResume();
            await listenButtons();
        } else {
            productsContainer.innerHTML = `No tenes ningun producto agregado al carro de compras`
        }


        function inyectProducts(products) {//Funcion que inyecta los productos en la lista del carro
            console.log(products);
            productsContainer.innerHTML = '';
            products.forEach(prod => {
                let product = prod.product;
                productsContainer.innerHTML +=
                    `
                <article class="producto">
                    <div class="flex-item contenedor-imagen-producto">
                        <img src="${window.location.origin}/img/products/${product.images[0].file_name}" alt="foto-producto" class="foto-producto">
                    </div>
                    <div class="flex-item informacion-producto">
                        <div class="flex-item contenedor-descripcion-producto">
                            <h4 class="nombre-producto">${product.name}</h4>
                            <p class="descripcion-producto">${product.description}</p>
                        </div>          
                        <div class="flex-item contenedor-precio-producto">
                            <p class="precio-parcial-producto">$${product.price - (product.price * product.discount / 100)}</p>
                        </div>
                        <div class="contenedor-input">
                            <input type="number" class="flex-item cantidad-producto" data-prodId="${product.id}" data-userId ="${userLoggedId}" value="${prod.quantity}">
                        </div>
                        <div class="contenedor-subtotal flex-item">
                            <p class="precio-subtotal">$${(parseFloat((prod.quantity * (product.price - (product.price * product.discount / 100))))).toFixed(2)}</p>
                        </div>
                    </div>
                    
                    <div class="contenedor-basura ">
                        <i class="fa-solid fa-trash" data-prodId="${product.id}" data-userId ="${userLoggedId}"></i>
                    </div>
                </article>`
            });
        }

        async function inyectBuyResume() { //Funcion que inyecta el precio en el resumen de compra
            try {
                let totalPriceCart = document.getElementById('total-price-cart');
                let totalProducts = document.querySelector('.products-amount');
                let productAmount = parseInt(await utils.getTotalProducts(userLoggedId));
                let subtotalPrice = parseFloat(await utils.getTotalPrice(userLoggedId));
                totalPriceCart.innerHTML = subtotalPrice;
                totalProducts.innerHTML = productAmount;
                let taxPrice = parseFloat((subtotalPrice * 0.21).toFixed(2));
                let totalPrice = parseFloat((subtotalPrice + 400 + taxPrice).toFixed(2));

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
            } catch (error) {
                return console.log(`Falle en inyectBuyResume: ${error}`)
            }
        }

        async function listenButtons() {
            const quantityButtons = document.querySelectorAll('.cantidad-producto');
            const deleteButtons = document.querySelectorAll('.fa-trash');

            //Voy por cada boton, si se cambia tengo que cambiarlo en el array
            for (let i = 0; i < quantityButtons.length; i++) {
                const btn = quantityButtons[i];
                btn.addEventListener('input', async (e) => {
                    try {
                        const newQuantity = btn.value >= 1 ? btn.value : 1;//Para que no baje a 0 o menos
                        const prodId = e.target.dataset.prodid;
                        const userId = e.target.dataset.userid;
                        let cartIndex = cart.temporalItems.findIndex(product => product.products_id == prodId);
                        cart.temporalItems[cartIndex].quantity = newQuantity;
                        (await (await fetch(`http://localhost:7000/api/product/updateTempItems`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(cart.temporalItems)
                        })).json());
                        inyectProducts(cart.temporalItems);
                        await inyectBuyResume();
                        await listenButtons();
                    } catch (error) {
                        return console.log(`Falle en listenButtons.quantityBtns.addEventListener: ${error}`)
                    }

                });
            }

            //Voy por cada boton, si apretan es que lo sacan del carro
            for (let i = 0; i < deleteButtons.length; i++) {
                const btn = deleteButtons[i];
                btn.addEventListener('click', async (e) => {
                    const prodId = e.target.dataset.prodid;
                    console.log(cart.temporalItems);
                    let cartIndex = cart.temporalItems.findIndex(product => product.products_id == prodId);
                    cart.temporalItems.splice(cartIndex, 1);
                    console.log(cart.temporalItems);
                    let response = (await (await fetch(`http://localhost:7000/api/product/deleteTempItem`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({prodId})
                    })).json());
                    inyectProducts(cart.temporalItems);
                    await inyectBuyResume();
                    await listenButtons();
                })
            }
        }
    } catch (error) {

    }
});


