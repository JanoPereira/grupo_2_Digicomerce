window.addEventListener('load', async () => {
    try {
        let userLoggedId = document.getElementById('user-logged-id').innerText;
        let cart = (await (await fetch('http://localhost:7000/api/user/' + userLoggedId)).json()).user.temporalCart.temporalItems; //Obtengo el carrito

        const tempCartId = cart[0].temporal_carts_id;//Lo agarro para una vez hecho el checkout eliminarlo

        ////Esto lo hago para 'amoldar' la lista de objetos orderItems, y asi me suba bien a db
        const modifiedCart = cart.map(prod => {
            return {
                products_id: prod.products_id,
                name: prod.product.name,
                price: prod.product.price,
                quantity: prod.quantity
            }
        });
        let buyResumeContainer = document.querySelector('.contenedor-resumen-fixed');
        const checkoutForm = document.querySelector('.form-datos-usuario');
        const subTotal = await getTotalPrice(cart);
        const taxes = parseFloat((subTotal * 0.21).toFixed(2));
        const total = parseFloat((subTotal + taxes).toFixed(2));
        buyResumeContainer.innerHTML = `
    <h1 class="titulo">Resumen de tu compra</h1> 
    <div class="contenedor-datos-finales">
        <p class="subtotal">Subtotal:</p>
        <p class="precio ">$${subTotal}</p>
        <p class="impuestos">IVA (21%):</p>
        <p class="precio">$${taxes}</p>
        <div class="contenedor-total-pedido">
            <p id="total-pedido">Total:</p>
            <p class="precio" id="precio-total">$${total}</p>
            <a href="/product/product-cart" class="link-volver-carro">Volver al carro</a>
        </div>
    </div>`
        checkoutForm.addEventListener('submit', async (e) => {
            try {
                e.preventDefault();
                const formData = { //Datos que voy a mandar(llegan por body) al fetch. 
                    orderItems: modifiedCart,
                    paymentMethod: checkoutForm.paymentMethod.value,
                    total,
                    name: checkoutForm.name.value,
                    lastName: checkoutForm.lastName.value,
                    phone: checkoutForm.phone.value,
                    address: checkoutForm.address.value,
                    city: checkoutForm.city.value,
                    zipCode: checkoutForm.zipCode.value,
                };
                
                //Hago el fetch a la api para que cree la orden con sus respectivos orderItems
                (await (await fetch('http://localhost:7000/api/product/checkout', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })).json());

                //TODO: Hacer esta logica en controlador api 
                //Borro el tempCart del usuario
                (await (await fetch(`http://localhost:7000/api/user/${userLoggedId}/deleteTempCart`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })).json());

            } catch (error) {
                return console.log(`Falle en checkoutForm.addEventListener: ${error}`)
            }
        });

    } catch (error) {
        return console.log(`Falle en checkout.load(): ${error}`)
    }
});


async function getTotalPrice(cart) {
    try {
        // Yo se que si o si voy a tener un carrito, porque esta funcion se invoca despues de que hice la funcion add()
        const total = cart.reduce((acum, value) => {//va por cada objeto dentro de carrito y suma quantity * total
            return acum = acum + (value.quantity * (parseInt(value.product.price) - parseInt(value.product.price) * value.product.discount / 100));
        }, 0);
        return parseFloat(total.toFixed(2))
    } catch (error) {
        return console.log(`Falle en getTotalPrice(): ${error}`);
    }
}

